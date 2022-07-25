import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../domain/product';
import { Cart } from '../domain/cart';
import {
    Firestore, addDoc, collection, collectionData,
    doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { update } from 'firebase/database';

@Injectable({
    providedIn: 'root'
})
export class FirebaseCRUDService {

    constructor(private firestore: Firestore) {



    }

    // tutorial : https://edupala.com/angular-firebase-crud-operation-using-angularfire/

    // * Get from products collection

    setProductsFromAllProducts(products: Product) {
        const productsRef = doc(this.firestore, `products/${products.id}`);
        return setDoc(productsRef, products);
    }

    deleteProductCollectionFromAllProducts(products: Product) {
        const productsRef = doc(this.firestore, `products`);
        return deleteDoc(productsRef);
    }

    deleteProductIDFromAllProducts(products: Product) {
        const productsRef = doc(this.firestore, `products/${products.id}`);
        return deleteDoc(productsRef);
    }

    updateProductIDFromAllProducts(products: Product) {
        const productsRef = doc(this.firestore, `products/${products.id}`);
        return setDoc(productsRef, products);
    }

    getProductByIDFromAllProducts(id: string) {
        const productsRef = doc(this.firestore, `products/${id}`);
        return docData(productsRef, { idField: 'id' }) as Observable<Product>;
    }

    // modify specific field
    // modifyProductPrice(products: Product, amount: number) {
    //     const productsRef = doc(this.firestore, `products/${products.id}`);
    //     return updateDoc(productsRef, { price: amount });
    // }

    

    // * Get from discounted products collection

    setProductsFromDiscountedProducts(products: Product) {
        const productsRef = doc(this.firestore, `discountedProducts/${products.id}`);
        return setDoc(productsRef, products);
    }

    deleteProductCollectionFromDiscountedProducts(products: Product) {
        const productsRef = doc(this.firestore, `discountedProducts`);
        return deleteDoc(productsRef);
    }

    deleteProductIDFromDiscountedProducts(products: Product) {
        const productsRef = doc(this.firestore, `discountedProducts/${products.id}`);
        return deleteDoc(productsRef);
    }

    updateProductIDFromDiscountedProducts(products: Product) {
        const productsRef = doc(this.firestore, `discountedProducts/${products.id}`);
        return setDoc(productsRef, products);
    }

    getProductByIDFromDiscountedProducts(id: string) {
        const productsRef = doc(this.firestore, `discountedProducts/${id}`);
        return docData(productsRef, { idField: 'id' }) as Observable<Product>;
    }

    // modify specific field
    // modifyProductPriceFromDiscountedProducts(products: Product, amount: number) {
    //     const productsRef = doc(this.firestore, `discountedProducts/${discountedProducts.id}`);
    //     return updateDoc(productsRef, { price: amount });
    // }

    //* cart
    // add to cart
    setCart(cart: Cart) {
        const cartsRef = doc(this.firestore, `cart/${cart.id}`);
        return setDoc(cartsRef, cart);
    }

    // get all products from cart
    getCart(){
        const cartsRef = collection(this.firestore, `cart`);
        return collectionData(cartsRef, { idField: 'id' }) as Observable<Cart>;
    }

    // update total price & quantity
    updateCartPriceQuantity(id: string, quantity: number, subtotal: number){
        const cartsRef = doc(this.firestore, `cart/${id}`);
        return updateDoc(cartsRef, {quantity: quantity, totalPrice: subtotal});
    }
}