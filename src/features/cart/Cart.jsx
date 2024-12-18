import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from '../cart/CartItem';
import EmptyCart from '../cart/EmptyCart';

import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';


function Cart() {
  const cart = useSelector(getCart)
  const username = useSelector(state=> state.user.username)

  const dispatch = useDispatch()

  const handleClearCart =()=>{
    dispatch(clearCart());
  }
  if(!cart.length) return <EmptyCart/>
  return (
    <div className='py-3 px-4 '>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>
      <ul className='divide-y divide-stone-200 border-b mt-3'>{cart.map(item=> <CartItem key={item.pizzaId} item={item}/>)}</ul>

      <div className='mt-6 space-x-2'> 
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button type="secondary" onClick={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
