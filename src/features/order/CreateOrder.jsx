import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Button from "../../ui/Button";
import store from '../../store';

import { createOrder } from "../../services/apiRestaurant";
import { clearCart, getCart } from "../cart/cartSlice";
import { fetchAddress } from "../users/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart)
  
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const isSubmittng = navigation.state === "submitting";

  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector(state=> state.user);
  const isLoadingAddress = addressStatus === 'loading';
  //getting the errors
  const formErrors = useActionData();

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" defaultValue={username} required className="input grow uppercase"/>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow ">
            <input type="tel" name="phone" required className="input w-full"/>
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 
            bg-red-100 p-2 rounded-md tracking-widest">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" disabled={isLoadingAddress} defaultValue={address} required className="input w-full"/>
            {addressStatus==='error' && <p className="text-xs mt-2 text-red-700 
            bg-red-100 p-2 rounded-md tracking-widest">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude && 
          <span className="absolute top-[3px] right-[3px] z-50  md:right-[5px] md:top-[5px] ">
            <Button type="small" disabled={isLoadingAddress} onClick={(e)=>{
             e.preventDefault() 
             dispatch(fetchAddress())
          }
            }>Get Position</Button></span>}

        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-offset-2 focus:ring-yellow-400 "
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center"> 
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude},${position.longitude}`:""}/>
          <Button type='primary' disabled={isSubmittng || isLoadingAddress} >
            {isSubmittng ? "Placing Order" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  //error handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please provide a valid phone number";

  if (Object.keys(errors).length > 0) return errors;
  //if there is no erro found create new Order
  const newOrder = await createOrder(order);

  //after the order is placed, need to clear the cart. this can be done by importing  the store
  //don't overuse this cause will cause performancce issue
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
