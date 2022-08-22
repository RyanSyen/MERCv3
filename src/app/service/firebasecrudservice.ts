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
import { User } from '../shared/user';
import { userDetails } from '../domain/userDetails';
import { cardDetails } from '../domain/cardDetails';
import { address } from '../domain/address';
import { Order } from '../domain/order';

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
    setCart(email: string, cart: Cart) {
        const cartsRef = doc(this.firestore, `${email}_cart/${cart.id}`);
        return setDoc(cartsRef, cart);
    }

    // get all products from cart
    getCart(email: string): Observable<Cart[]> {
        const cartsRef = collection(this.firestore, `${email}_cart`);
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

    deleteCartItem(email: string, id: string) {
        const cartsRef = doc(this.firestore, `${email}_cart/${id}`);
        return deleteDoc(cartsRef);
    }

    deleteCart(email: string) {
        const cartsRef = doc(this.firestore, `${email}_cart`);
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

    //* get user data
    getUserData(): Observable<User[]> {
        const userRef = collection(this.firestore, `users`);
        return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
    }

    // getIndividualUser(): Observable<User[]> {
    //     // const userRef = doc(this.firestore, `users/${id}`);
    //     // return docData(userRef, { idField: 'id' }) as Observable<User[]>;
    //     const userRef = doc(this.firestore, `users`);
    //     return docData(userRef, { idField: 'id' }) as Observable<User[]>;
    // }
    updateName(email: string, name: string) {
        const userRef = doc(this.firestore, `users/${email}`);

        return updateDoc(userRef, { displayName: name });
    }


    updateProfileImage(url: string, id: string) {
        // const cartsRef = doc(this.firestore, `cart/${id}`);
        const userRef = doc(this.firestore, `users/${id}`);

        return updateDoc(userRef, { photoURL: url });
    }

    setUserDetails(id: string, userDetails: userDetails) {
        const userDetailsRef = doc(this.firestore, `userDetails/${id}`);
        return setDoc(userDetailsRef, userDetails);
    }

    getUserDetails(id: string): Observable<userDetails[]> {
        const userDetailsRef = collection(this.firestore, `userDetails`);
        return collectionData(userDetailsRef, { idField: 'id' }) as Observable<userDetails[]>;
    }

    updateUserDetails(id: string, address: string) {
        const userDetailsRef = doc(this.firestore, `userDetails/${id}`);
        return updateDoc(userDetailsRef, { address: address });
    }

    storeUserCard(email: string, card: cardDetails) {
        console.log(card.id)
        const cardRef = doc(this.firestore, `${email}/${card.id}`);
        return setDoc(cardRef, card);
    }

    getUserCard(email: string): Observable<cardDetails[]> {
        const cardRef = collection(this.firestore, `${email}`);
        return collectionData(cardRef, { idField: 'id' }) as Observable<cardDetails[]>;
    }

    deleteCard(email: string, id: string) {
        let newID = parseInt(id);
        const cardRef = doc(this.firestore, `${email}/${newID}`);
        return deleteDoc(cardRef);
    }

    addAddress(email: string, id: string, address: address) {
        const addressRef = doc(this.firestore, `${email}+_address/${id}`);
        return setDoc(addressRef, address);
    }

    getUserAddress(email: string): Observable<address[]> {
        const addressRef = collection(this.firestore, `${email}+_address`);
        return collectionData(addressRef, { idField: 'id' }) as Observable<address[]>;
    }

    updateAddress(email: string, id: string, address: string) {
        const addressRef = doc(this.firestore, `${email}+_address/${id}`);
        return updateDoc(addressRef, { address: address });
    }

    deleteAddress(email: string, id: string) {
        const addressRef = doc(this.firestore, `${email}+_address/${id}`);
        return deleteDoc(addressRef);
    }

    // userBalance
    setBalance(email: string, amount: number) {
        const balanceRef = doc(this.firestore, `balance/${email}`);
        return setDoc(balanceRef, { balance: amount });
    }

    getBalance() {
        const addressRef = collection(this.firestore, `balance`);
        return collectionData(addressRef, { idField: 'email' });
    }

    updateBalance(email: string, amount: number) {
        const addressRef = doc(this.firestore, `balance/${email}`);
        return updateDoc(addressRef, { balance: amount });
    }

    //* payment method 
    setUserPaymentMethod(email: string, paymentMethod: string) {
        const paymentMethodRef = doc(this.firestore, `paymentMtd/${email}`);
        return setDoc(paymentMethodRef, { paymentMtd: paymentMethod });
    }

    setUserOrder(email: string, order: Order, orderID: number) {
        const orderRef = doc(this.firestore, `order_${email}/${orderID}`);
        return setDoc(orderRef, order);
    }

    getUserOrder(email: string) {
        const orderRef = collection(this.firestore, `order_${email}`);
        return collectionData(orderRef, { idField: 'id' });
    }

}