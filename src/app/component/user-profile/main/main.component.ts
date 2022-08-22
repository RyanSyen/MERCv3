import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { User } from 'src/app/shared/user';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';
import { Observable } from 'rxjs';
import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { userDetails } from 'src/app/domain/userDetails';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { cardDetails } from 'src/app/domain/cardDetails';
import { address } from 'src/app/domain/address';
import { AnimateTimings } from '@angular/animations';
import { Voucher } from 'src/app/domain/voucher';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent implements OnInit {

  userName: string = "";
  userAccPage = "profile";
  userImg = "";
  userEmail = "";
  userAddress = "";
  userUser: any;

  currentUser: any;
  currentUserDetails: any;

  person: any;
  userImage: string = "";
  name = false;

  // upload
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  // new values
  newName = "";
  newAddress = "";

  savedStatus = "save";
  visa: RegExp = /^4[0-9]{12}(?:[0-9]{3})?$/g;
  mastercard: RegExp = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/g;
  userForm: any;
  invalid = false;

  text = "";
  test: any;
  unusedID = 0;

  numOfCards = 0;
  // card #1
  ID1 = false;
  firstCard: any;
  cardID = 0;
  cardNum: any;
  cardExpMonth = "";
  cardExpYear = "";
  cardCVV = "";
  card = "";
  // card #2
  ID2 = false;
  secondCard: any;
  cardID1 = 0;
  cardNum1: any;
  cardExpMonth1 = "";
  cardExpYear1 = "";
  cardCVV1 = "";
  card1 = "";
  // card #3
  ID3 = false;
  thirdCard: any;
  cardID2 = 0;
  cardNum2: any;
  cardExpMonth2 = "";
  cardExpYear2 = "";
  cardCVV2 = "";
  card2 = "";

  confirmState = "";
  idDelete = "";
  firstID?= 0;
  secondID?= 0;
  thirdID?= 0;

  // address
  address1?: address;
  allAddresses: any;
  addAddressStatus = true;
  addressTextArea = " ";
  addressHeaderStatus = "Addresses";
  editAddressStatus = true;
  selectedAddress = "";
  addressList = false;
  selectedAddressIndex = 0; // for edit address
  deleteAddressIndex = 0;

  // password
  hidePWError = true;
  hideVerifiedOldPW = true;
  errorCount = 0;
  hideTimer = true;

  // voucher
  vouchers: Voucher[] = [];
  checked = false;
  voucher0Title: string = "";
  voucher1Title: string = "";
  voucher2Title: string = "";
  voucher0Min: number = 0;
  voucher1Min: number = 0;
  voucher2Min: number = 0;

  currentOrderID = 0o00;
  items: any;
  total = 0;
  paymentMethod = "";
  receiverName = "";
  receiverHP = "";
  receiverAddress = "";
  order: any;
  orderID: any;

  orderStatus = false;
  currentOrderStatusID = 0;
  topup = true;

  userBal = 0;

  constructor(public authService: AuthService, private uploadService: FileUploadService, private firebaseService: FirebaseCRUDService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private modalService: NgbModal, private fb: FormBuilder) {
    this.currentUser = this.authService.getCurrentUserData();
    console.log(this.currentUser.email);
    console.log(this.currentUser.userPassword);

    this.currentUserDetails = this.authService.getCurrentUserCredentials();


  }

  address: address[] = [
    {
      address: "",
    }
  ]

  ngOnInit(): void {

    //* get user balance
    this.firebaseService.getBalance().subscribe((balance) => {
      console.log(balance);
      balance.forEach(element => {
        console.log(element['balance'], this.total)
        if (element['email'] == this.currentUser.email) {
          console.log("true email")
          this.userBal = element['balance'];
        }
      })
    });

    //* get user order
    this.firebaseService.getUserOrder(this.currentUser.email).subscribe((order) => {


      console.log(order);
      this.order = order;
      order.forEach(element => {
        this.currentOrderID = element['orderID'];
        this.items = element['item'];
        console.log(this.items, this.currentOrderID)
        // this.paymentMethod = element['paymentMethod'];
        // this.receiverAddress = element['receiverAddress'];
        // this.receiverHP = element['receiverHP'];
        // this.receiverName = element['receiverName'];
        // this.total = element['total'];

      });
    })



    //* fetch voucher from firebase
    // error and completion signal is not working, maybe observable is not emitted
    this.firebaseService.getVouchers().subscribe((voucher: Voucher[]) => {
      this.vouchers = voucher;
      this.voucher0Title = voucher[0].title;
      this.voucher1Title = voucher[1].title;
      this.voucher2Title = voucher[2].title;
      this.voucher0Min = voucher[0].min;
      this.voucher1Min = voucher[1].min;
      this.voucher2Min = voucher[2].min;
      // console.log(voucher)
    })

    this.firebaseService.getUserDetails(this.currentUser.email).subscribe((userDetails: any) => {
      this.userUser = userDetails;

      console.log(this.userUser)
      userDetails.forEach((element: { id: any; address: string; }) => {
        console.log(element.id)
        if (element.id == this.currentUser.email) {
          this.userAddress = element.address;

          console.log(element.address)
        }
      });
      // console.log(userDetails)
      // this.userAddress = this.userUser.address;
    })


    this.firebaseService.getUserData().subscribe((person) => {

      person.forEach(element => {
        console.log("element email = " + element.email, "current user email = " + this.currentUser.email, element.email == this.currentUser.email)
        if (element.email == this.currentUser.email) {
          console.log(element)
          this.userImage = element.photoURL;
          this.userName = element.displayName;
          this.userEmail = element.email;
          if (element.displayName) {
            this.name == true;
          }

        }
      });
    })

    this.firebaseService.getUserCard(this.currentUser.email).subscribe((card) => {
      console.log(card)
      this.numOfCards = card.length;
      if (this.numOfCards == 1) {
        this.firstID = card[0].id;
      } else if (this.numOfCards == 2) {
        this.firstID = card[0].id;
        this.secondID = card[1].id;
        console.log(this.firstID, this.secondID, this.unusedID)
      } else if (this.numOfCards == 3) {
        this.firstID = card[0].id;
        this.secondID = card[1].id;
        this.thirdID = card[2].id;
        console.log(this.firstID, this.secondID, this.thirdID)
      }

      // scenario is when delete card number1 it not add a new card with id 1 but updates the 3rd card everytime because our numOfCards is refering to 3
      // now we want to check from the db which id is not used where length < 3

      console.log(this.numOfCards)

      if (card.length == 2) {
        console.log("length less than 3")
        // find out which id is not used

        if (this.firstID != 1 && this.secondID != 1) {
          // if true means id 1 is not taken, assign numOfCards to unused id
          this.unusedID = 1;
        } else if (this.firstID != 2 && this.secondID != 2) {
          this.unusedID = 2;
        } else if (this.firstID != 3 && this.secondID != 3) {
          this.unusedID = 3;
        }
        console.log(this.unusedID, this.numOfCards)

        if (this.firstID == 1 || this.secondID == 1) {
          this.ID1 = true;
        }
        if (this.firstID == 2 || this.secondID == 2) {
          this.ID2 = true;
        }
        if (this.firstID == 3 || this.secondID == 3) {
          this.ID3 = true;
        }
        console.log(this.ID1, this.ID2, this.ID3)
      } else if (card.length == 1) {
        let firstID = card[0].id;
        if (firstID == 1) {
          this.ID1 = true;
          this.unusedID = 2;
        } else {
          this.unusedID = 1;
          if (firstID == 2) {
            this.ID2 = true;
          } else if (firstID == 3) {
            this.ID2 = true;
          }
        }
      } else {
        this.ID1 = true;
        this.ID2 = true;
        this.ID3 = true;
      }

      if (this.firstID == 1) {
        console.log("total 1")
        // first card
        this.cardID = card[0].id;
        this.cardNum = card[0].cardNum;
        this.cardExpMonth = card[0].expMonth;
        this.cardExpYear = card[0].expYear;
        this.cardCVV = card[0].CVV;
        this.validateCardType(card[0].cardNum, this.cardID);
      } else if (this.firstID == 2) {
        // second card
        this.cardID1 = card[0].id;
        this.cardNum1 = card[0].cardNum;
        this.cardExpMonth1 = card[0].expMonth;
        this.cardExpYear1 = card[0].expYear;
        this.cardCVV1 = card[0].CVV;
        this.validateCardType(card[0].cardNum, this.cardID1);
      } else if (this.firstID == 3) {
        // third card
        this.cardID2 = card[0].id;
        this.cardNum2 = card[0].cardNum;
        this.cardExpMonth2 = card[0].expMonth;
        this.cardExpYear2 = card[0].expYear;
        this.cardCVV2 = card[0].CVV;
        this.validateCardType(card[0].cardNum, this.cardID2);
      }

      if (this.secondID == 1) {
        // first card
        this.cardID = card[1].id;
        this.cardNum = card[1].cardNum;
        this.cardExpMonth = card[1].expMonth;
        this.cardExpYear = card[1].expYear;
        this.cardCVV = card[1].CVV;
        this.validateCardType(card[1].cardNum, this.cardID);
      } else if (this.secondID == 2) {
        // second card
        this.cardID1 = card[1].id;
        this.cardNum1 = card[1].cardNum;
        this.cardExpMonth1 = card[1].expMonth;
        this.cardExpYear1 = card[1].expYear;
        this.cardCVV1 = card[1].CVV;
        this.validateCardType(card[1].cardNum, this.cardID1);
      } else if (this.secondID == 3) {
        // third card
        this.cardID2 = card[1].id;
        this.cardNum2 = card[1].cardNum;
        this.cardExpMonth2 = card[1].expMonth;
        this.cardExpYear2 = card[1].expYear;
        this.cardCVV2 = card[1].CVV;
        this.validateCardType(card[1].cardNum, this.cardID2);
      }

      if (this.thirdID == 1) {
        // first card
        this.cardID = card[2].id;
        this.cardNum = card[2].cardNum;
        this.cardExpMonth = card[2].expMonth;
        this.cardExpYear = card[2].expYear;
        this.cardCVV = card[2].CVV;
        this.validateCardType(card[2].cardNum, this.cardID);
      } else if (this.thirdID == 2) {
        // second card
        this.cardID1 = card[2].id;
        this.cardNum1 = card[2].cardNum;
        this.cardExpMonth1 = card[2].expMonth;
        this.cardExpYear1 = card[2].expYear;
        this.cardCVV1 = card[2].CVV;
        this.validateCardType(card[2].cardNum, this.cardID1);
      } else if (this.thirdID == 3) {
        // third card
        this.cardID2 = card[2].id;
        this.cardNum2 = card[2].cardNum;
        this.cardExpMonth2 = card[2].expMonth;
        this.cardExpYear2 = card[2].expYear;
        this.cardCVV2 = card[2].CVV;
        this.validateCardType(card[2].cardNum, this.cardID2);
      }

    })

    // get user address
    this.firebaseService.getUserAddress(this.currentUser.email).subscribe((address) => {
      this.allAddresses = address;
      this.address = address;
      console.log(this.allAddresses.length)
    });

  }




  slide(page: string) {

    // $('.pages').toggleClass('move-right');
    $('.pages').addClass('move-right');


    setTimeout(() => {
      this.userAccPage = page;
      $('.pages').removeClass('move-right');
    }, 800)

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload, this.currentUser.email).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  processName(name: HTMLInputElement) {
    console.log(name.value);
  }

  processLocation(location: HTMLInputElement) {

  }

  saveUserData(location: string, name: string) {
    console.log(location + " and " + name)
  }



  // toast
  showConfirm(location: string, name: string) {
    console.log(location + " and " + name)
    this.confirmState = "saveProfile";
    this.newName = name;
    console.log(this.newName)
    this.newAddress = location;
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  onConfirm() {
    if (this.confirmState == "saveProfile") {
      console.log("set name to db")
      // save new values to user profile in firebase
      this.firebaseService.updateUserDetails(this.currentUser.email, this.newAddress);
      this.firebaseService.updateName(this.currentUser.email, this.newName);

      this.address.push(
        {
          address: this.newAddress,
        }
      );
      let size = this.address.length - 1;
      this.firebaseService.addAddress(this.currentUser.email, size.toString(), this.address[size]);

    } else if (this.confirmState == "deleteCard") {
      // delete card
      this.firebaseService.deleteCard(this.currentUser.email, this.idDelete);
    } else if (this.confirmState == "deleteAddress") {
      this.firebaseService.deleteAddress(this.currentUser.email, this.deleteAddressIndex.toString());

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Address deleted successfully' });
    }

    this.messageService.clear('c');
  }

  onReject() {

    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

  openModal(content: any) {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
    // this.numOfCards++;
  }

  saveCardDetails(cardNum: string, month: string, year: string, CVV: string) {

    // separate cardNum into 4 parts
    this.cardNum = cardNum.match(/.{1,4}/g);
    this.cardExpMonth = month;
    this.cardExpYear = year;
    this.cardCVV = CVV;


    // check to disable add card btn
    this.disableBtn();

    // console.log(this.cardNum);

    let closeBtn = document.getElementById("closeBtn");


    // console.log("card = " + cardNum + "\n month = " + month + " \n year = " + year + "\n CVV = " + CVV);

    this.savedStatus = "saved";
    // store in database
    // TODO

    // convert all credit card number into one

    if (this.numOfCards === 1) {
      this.firstCard =
      {
        id: this.unusedID,
        cardNum: this.cardNum,
        expMonth: this.cardExpMonth,
        expYear: this.cardExpYear,
        CVV: this.cardCVV
      }

      this.firebaseService.storeUserCard(this.currentUser.email, this.firstCard);
    } else if (this.numOfCards === 2) {
      console.log(this.cardNum1)
      this.secondCard =
      {
        id: this.unusedID,
        cardNum: this.cardNum,
        expMonth: this.cardExpMonth,
        expYear: this.cardExpYear,
        CVV: this.cardCVV
      }

      this.firebaseService.storeUserCard(this.currentUser.email, this.secondCard);
    } else if (this.numOfCards === 3) {
      this.thirdCard =
      {
        id: this.unusedID,
        cardNum: this.cardNum,
        expMonth: this.cardExpMonth,
        expYear: this.cardExpYear,
        CVV: this.cardCVV
      }

      this.firebaseService.storeUserCard(this.currentUser.email, this.thirdCard);
    }



    this.showSuccess();
    setTimeout(() => {
      closeBtn?.click();
    }, 2000);

  }

  keyup(value: string) {
    this.validateCardType(value, this.unusedID);
  }

  // show saved successful
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Card saved successfully' });
  }

  disableBtn() {
    // if number of cards is 3, disable add card btn
    if (this.numOfCards === 3) {
      // $("#addCardBtn").prop("disabled", true);
      let btn = document.getElementById("addCardBtn") as HTMLButtonElement;
      btn.disabled = true;
    }
  }

  validateCardType(value: string, id: number) {
    let cardNumber = this.combineNumbersFromCard(value);

    console.log(cardNumber, id)
    console.log(this.testVisaCard(cardNumber));
    console.log(cardNumber)

    if (id == 1) {
      console.log("processedFirst")
      console.log(this.testVisaCard("4111111111111111"));
      console.log(cardNumber)
      if (this.testVisaCard(cardNumber)) {
        this.card = "visa";
      } else if (this.mastercard.test(cardNumber)) {
        this.card = "mastercard";
      } else {
        this.card = "no matching card";
      }
      console.log(this.card)
    } else if (id == 2) {
      console.log("processedSecond")
      if (this.testVisaCard(cardNumber)) {
        this.card1 = "visa";
      } else if (this.mastercard.test(cardNumber)) {
        this.card1 = "mastercard";
      } else {
        this.card1 = "";
      }
      console.log(this.card1)
    } else if (id == 3) {
      console.log("processedThird")
      if (this.testVisaCard(cardNumber)) {
        this.card2 = "visa";
      } else if (this.mastercard.test(cardNumber)) {
        console.log("mastercard true");
        this.card2 = "mastercard";
      } else {
        this.card2 = "";
      }
      console.log(this.card2)
    } else {
      console.log("validation error!");
    }
  }

  combineNumbersFromCard(cardNumber: any) {
    let string = "";
    for (let i = 0; i < cardNumber.length; i++) {
      string = string + cardNumber[i];
    }
    return string;
  }

  testVisaCard(card: string) {
    let visaCard = this.visa.test(card);
    // console.log(visaCard, card)
    return visaCard;
  }

  deleteCard(id: string) {
    this.idDelete = id;
    this.confirmState = "deleteCard";
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });

    // this.firebaseService.deleteCard(this.currentUser.email, id);
  }

  initializeAddress(address: string) {
    this.address[0].address = address;
    this.address.forEach(element => {
      this.firebaseService.addAddress(this.currentUser.email, '0', element);
    });
    // this.address[0].address1 = address;
    // console.log(this.address1!.address1);
    // this.firebaseService.addAddress(this.currentUser.email, '0', this.address1!.address1);
  }

  addAddress() {
    this.addressHeaderStatus = "Add Address";
    this.addAddressStatus = false;
    this.addressList = true;
  }

  saveAddress(address: any) {
    this.address.push(
      {
        address: address,
      }
    );
    let size = this.address.length - 1;
    this.firebaseService.addAddress(this.currentUser.email, size.toString(), this.address[size]);
    const textarea = document.getElementById('textAreaAddress') as HTMLTextAreaElement;
    textarea!.value = '';
    // console.log(this.address)
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Address saved successfully' });
    this.backFromAddAddress();
  }

  backFromAddAddress() {
    this.addressHeaderStatus = "Addresses";
    this.addAddressStatus = true;
    this.addressList = false;
    this.editAddressStatus = true;
  }

  editAddress(index: any) {
    this.addressHeaderStatus = "Edit Address " + index;
    this.selectedAddress = this.address[index].address;
    this.selectedAddressIndex = index;
    this.editAddressStatus = false;
    this.addressList = true;
  }

  updateAddress(address: any) {
    console.log(address)
    this.firebaseService.updateAddress(this.currentUser.email, this.selectedAddressIndex.toString(), address);

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Address updated successfully' });

    this.backFromAddAddress();
  }

  deleteAddress(index: any) {
    this.deleteAddressIndex = index;
    this.confirmState = "deleteAddress";
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  checkOldPwd(pw: string) {

    console.log(this.currentUserDetails)
    if (this.currentUser.userPassword == pw) {
      this.hideVerifiedOldPW = false;

    } else {
      this.hidePWError = false;
      if (this.errorCount >= 3) {
        this.showMaximumNumberOfAttempts();

        // start timer
        // this.hideTimer = false;
        // document.getElementById('timer')!.innerHTML = "01" + ":" + "11";
        // this.startTimer();
        // this.testing();

        setTimeout(() => {

          alert("done")
          this.errorCount = 0;
          this.hidePWError = true;
          this.hideTimer = true;
          let text = document.getElementById("oldPwd") as HTMLInputElement;
          text.value = " ";
        }, 5000)


      } else {
        this.errorCount++;
        this.showIncorrectPasswordMessage();
      }

    }
  }

  showIncorrectPasswordMessage() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect password' });
  }

  showMaximumNumberOfAttempts() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Maximum attempts reached! Please try again later.' });
  }

  startTimer() {
    var presentTime = document.getElementById('timer')!.innerHTML;
    let timeArray: any = presentTime.split(/[:]+/);
    var m = parseInt(timeArray[0]);

    // var s = this.checkSec(second);
    let sec: any;
    let s: any;
    sec = parseInt(timeArray[1]) - 1;
    console.log(sec)
    if (sec < 10 && sec >= 0) { s = "0" + sec }; // add zero in front of numbers < 10
    // sec = parseInt(sec);
    if (sec < 0) { s = "59"; sec == 59 };
    console.log("seconds = " + sec)
    if (sec == 59) { m = m - 1 }
    if (m < 0) {
      return
    }

    if (sec == 0 && m == 0) {
      this.hideTimer = false;
    }

    // let s = parseInt(sec);
    document.getElementById('timer')!.innerHTML =
      m + ":" + sec;
    console.log(m, sec)
    setTimeout(this.startTimer, 1000);
  }

  // checkSecond(sec: any) {
  //   if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
  //   if (sec < 0) { sec = "59" };
  //   return sec;
  // }

  // checkSec(sec: any) {
  //   if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
  //   if (sec < 0) { sec = "59" };
  //   return sec;
  // }

  testing() {
    let second = 5000 / 1000;
    second = second - 1;
    document.getElementById('timer')!.innerHTML = second.toString();
    setTimeout(this.testing, 1000)
  }

  updatePassword(password: string) {

  }

  selectOrder(id: number) {
    // this.currentOrderStatusID = id;
    // let ID = id.toString();
    // console.log(id)
    // let el = document.getElementById(ID);

    // if (el!.style.display == "none") {
    //   el!.style.display = "block";
    // } else {
    //   el!.style.display = "none";
    // }
  }

  confirmTopUp(amt: string) {
    this.userBal += parseInt(amt);

    this.firebaseService.updateBalance(this.currentUser.email, this.userBal);
    this.topup = !this.topup;
  }
}
