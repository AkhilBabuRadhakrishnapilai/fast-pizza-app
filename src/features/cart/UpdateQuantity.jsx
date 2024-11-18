import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import {reduceItemQuantity, updateItemQuantity} from '../cart/cartSlice';


const UpdateQuantity = ({pizzaId, currentQuantity}) => {
    const dispatch = useDispatch()
  return (
    <div className="flex gap-1 items-center md:gap-3">
      <Button type='round' onClick={()=>dispatch(reduceItemQuantity(pizzaId))}>-</Button>
      <span className="text-sm font-medium ">{currentQuantity}</span>
      <Button type='round' onClick={()=>dispatch(updateItemQuantity(pizzaId))}>+</Button>
    </div>
  )
}

export default UpdateQuantity;
