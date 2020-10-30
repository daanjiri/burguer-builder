import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import classes from './BurgerBuilder.module.css';
import Modal from '../../components/UI/Modal/Modal.jsx';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat: 1.3,
    bacon:0.7,
}

class BurgerBuilder extends Component {
    
    state={
       ingredients:{
           salad:0,
           bacon:0,
           cheese:0,
           meat:0,
       },
       totalPrice:4,
       purchasable:false,
       purchasing:false,
    }
    
    updatePurchaseState = (ingredients)=>{
  
        const sum = Object.keys(ingredients)
                    .map(igKey=>ingredients[igKey])
                    .reduce((sum,el)=>(sum+el),0)
        console.log(sum)
        this.setState(()=>({purchasable: sum>0}),()=>console.log(this.state))
        
    }

    addIngredientHandler = (type)=>{
    
       const priceAddition = INGREDIENT_PRICES[type];
       const updatedIngredients={...this.state.ingredients,[type]:this.state.ingredients[type]+1}
       
       /*se usa setstate con una funcion para usar el parametro prevState para que se use el estado anterior del estado,
         tambien se usa desestructuracion {...prevState.ingredients,} para copiar los elementos de esa llave del anterior estado,
         se modifica mas una unidad la llave type usando [type] que en un objeto esa sintaxis se lee como una variable,
         por ultimo se usa un callback function para que el estado se actualize enseguida y no por batches.
       */
       this.setState((prevState)=>({
          ingredients: updatedIngredients,// {...prevState.ingredients, [type]:prevState.ingredients[type]+1},
          totalPrice: prevState.totalPrice+priceAddition,
       }),()=>console.log(this.state,"addIngredient"));
       console.log("test1")
       this.updatePurchaseState(updatedIngredients);
       console.log("test2")
    }


    removeIngredientHandler = (type)=>{
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldCount =this.state.ingredients[type];
        const updatedIngredients={...this.state.ingredients,[type]:this.state.ingredients[type]-1}

        if(oldCount<=0){
            return;
        }
       this.setState((prevState)=>({
          ingredients: updatedIngredients,
          totalPrice: prevState.totalPrice-priceDeduction,
       }),()=>console.log(this.state,"remoceIngredient"));

       this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = ()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=()=>{
        alert('You continue!')
    }

    render(){
        const disabledInfo={
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return(
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary 
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}/>
            </Modal>
            <div className={classes.BurgerBuilder}>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />

            </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;