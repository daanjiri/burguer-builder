import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import classes from './BurgerBuilder.module.css';

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
    }

    addIngredientHandler = (type)=>{
    
       const priceAddition = INGREDIENT_PRICES[type];
       
       /*se usa setstate con una funcion para usar el parametro prevState para que se use el estado anterior del estado,
         tambien se usa desestructuracion {...prevState.ingredients,} para copiar los elementos de esa llave del anterior estado,
         se modifica mas una unidad la llave type usando [type] que en un objeto esa sintaxis se lee como una variable,
         por ultimo se usa un callback function para que el estado se actualize enseguida y no por batches.
       */
       this.setState((prevState)=>({
          ingredients:  {...prevState.ingredients, [type]:prevState.ingredients[type]+1},
          price: prevState.price+priceAddition,
       }),()=>console.log(this.state.ingredients));
       
    }


    removeIngredientHandler = (type)=>{
        
    }

    render(){
        return(
            <Aux>
            <div className={classes.BurgerBuilder}>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                />

            </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;