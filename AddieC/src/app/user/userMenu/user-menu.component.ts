import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { UserService } from '../userShared/user.service';
import { PostService } from '../userShared/post.service';
import { Post } from '../userShared/post';

import * as firebase from 'firebase';

@Component({
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.css']
})

export class UserMenuComponent implements OnInit {
    theUser: string;
    userNickname: string;
    navOpen = false;
    profilePicUrl = '../../assets/example_profile_picture.jpg';
    posts: Post[];
    testing: any;
    isDataAvailable = false;

    constructor(private userSVC: UserService, private router: Router, private dialog: MdDialog, private postSVC: PostService) { }

    ngOnInit() {
        this.theUser = this.userSVC.loggedInUser;
        this.getPosts();
    }

    viewPosts() {
        this.router.navigate(['/user/posts'])
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    contacts() {
        const dialogRef = this.dialog.open(ContactsDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.testing = result;
        });
    }

    about() {
        this.router.navigate(['/user/about']);
    }

    addPost() {
        this.router.navigate(['/user/addPost']);
    }

    getPosts() {
        const dbRef = firebase.database().ref('posts/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.posts = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId());
        });

        const userDbRef = firebase.database().ref('users/');
        userDbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.userNickname = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId())[0].nickname;
        }).then(() =>
        this.isDataAvailable = true);
    }

    deletePost(single: Post) {
        const verify = confirm(`Are you sure you want to delete this post?`)
        if (verify === true) {
            this.postSVC.deletePost(single);
            this.router.navigate(['/user']);
        } else {
            alert('Nothing deleted!');
        }
    }
}

@Component({
    templateUrl: './contactsDialog/contacts-dialog.component.html',
    styleUrls: ['./contactsDialog/contacts-dialog.component.css']
})
export class ContactsDialogComponent implements OnInit {
    theUser: any;
    contactsList: string[] = [];
    contactsEmpty = false;
    isDataAvailable = false;

    constructor(
        private dialogRef: MdDialogRef<ContactsDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private userSVC: UserService) {}

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        const dbRef = firebase.database().ref('users/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId())[0];
            if (this.theUser.contacts) {
                for (const uid of this.theUser.contacts) {
                    dbRef.once('value')
                    .then((snapshot) => {
                        const tmp: string[] = snapshot.val();
                        this.contactsList.push(Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === uid)[0].nickname);
                    });
                }
                this.theUser.contacts.reverse();
            } else {
                this.contactsList = ['None'];
                this.contactsEmpty = true;
            }
        }).then(() =>
        this.isDataAvailable = true);
    }

    remove(user: any) {
        const verify = confirm(`Are you sure you want to remove ` + user + ` from your contacts?`);

        if (verify === true) {
            const userIndex = this.contactsList.indexOf(user);
            this.userSVC.removeContact(this.theUser, this.theUser.contacts[userIndex]);
        }
    }
}
