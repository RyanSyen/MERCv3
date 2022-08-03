import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../domain/product';
import { Cart } from '../domain/cart';
import { Voucher } from '../domain/voucher';
import {
    Firestore, addDoc, collection, collectionData,
    doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { update } from 'firebase/database';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { selectedVoucher } from '../domain/selectedVoucher';


@Injectable({
    providedIn: 'root'
})
export class FirebaseCRUDService {

    private firestoreDB: FirebaseTSFirestore;



    constructor(private firestore: Firestore) {
        this.firestoreDB = new FirebaseTSFirestore();

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
    // add item to cart
    addToCart(cart: Cart) {
        const cartsRef = collection(this.firestore, `cart`);
        return addDoc(cartsRef, cart);
    }

    // update cart items
    setCart(cart: Cart) {
        const cartsRef = doc(this.firestore, `cart/${cart.id}`);
        return setDoc(cartsRef, cart);
    }

    // get all products from cart
    getCart(): Observable<Cart[]> {
        const cartsRef = collection(this.firestore, `cart`);
        return collectionData(cartsRef, { idField: 'id' }) as Observable<Cart[]>;
    }

    // update total price & quantity
    updateCartPriceQuantity(id: string, quantity: number, subtotal: number) {
        const cartsRef = doc(this.firestore, `cart/${id}`);
        return updateDoc(cartsRef, { quantity: quantity, totalPrice: subtotal });
    }

    populateWithFirebaseTSFirestore(cartItem: Cart) {


        this.firestoreDB.create(
            {
                path: [
                    "Cart",
                    cartItem.id
                ],
                data: {
                    id: cartItem.id,
                    placeholderImg: cartItem.placeholderImg,
                    title: cartItem.title,
                    variations: cartItem.variations,
                    oldPrice: cartItem.oldPrice,
                    discountedPrice: cartItem.discountedPrice,
                    quantity: cartItem.quantity,
                    totalPrice: cartItem.totalPrice
                },
                onComplete: docId => {
                    // Code gets executed when it was successful.
                    // alert("Data recorded!");
                },
                onFail: err => {
                    // Code gets executed when it fails.
                    alert(err.message);
                }
            }
        );
    }

    deleteCartItem(id: string) {
        const cartsRef = doc(this.firestore, `cart/${id}`);
        return deleteDoc(cartsRef);
    }

    //* voucher

    populateVoucher(voucher: Voucher) {
        const voucherRef = doc(this.firestore, `voucher/${voucher.type}`);
        return setDoc(voucherRef, voucher);
    }

    getVouchers(): Observable<Voucher[]> {
        const voucherRef = collection(this.firestore, `voucher`);
        return collectionData(voucherRef, { idField: 'type' }) as Observable<Voucher[]>;
    }

    setSelectedVouchers(voucher: selectedVoucher) {
        const voucherRef = doc(this.firestore, `selectedVoucher/${voucher.id}`);
        return setDoc(voucherRef, voucher);
    }

    getSelectedVouchers(): Observable<selectedVoucher[]> {
        const voucherRef = collection(this.firestore, `selectedVoucher`);
        return collectionData(voucherRef, { idField: 'id' }) as Observable<selectedVoucher[]>;
    }

}