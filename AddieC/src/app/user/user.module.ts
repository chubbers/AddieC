import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
   MdButtonModule,
   MdCheckboxModule,
   MdMenuModule,
   MdToolbarModule,
   MdCardModule,
   MdInputModule,
   MdGridListModule,
   MdTabsModule,
   MdRadioModule,
   MdListModule,
   MdDialogModule,
   MdSelectModule,
   MdIconModule,
   MdTooltipModule,
   MdSliderModule,
   MdAutocompleteModule
  } from '@angular/material';

import { UserNavComponent } from './userShared/userNavbar/user-navbar.component';
import { UserComponent } from './userComponent/user.component';
import { UserMenuComponent } from './userMenu/user-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { UserPostsComponent } from './userPosts/user-posts.component';
import { PostAddComponent } from './postAdd/post-add.component';
import { PostEditComponent } from './postEdit/post-edit.component';
import { UserSettingsComponent } from './userSettings/settingsMenu/user-settings.component';
import { BlockedUsersComponent } from './userSettings/blockedUsers/blocked-users.component';
import { BlockedUsersDialogComponent } from './userSettings/blockedUsers/blocked-users.component';
import { SecurityQuestionComponent } from './userSettings/securityQuestion/security-question.component';
import { ReportAbuseComponent } from './userSettings/reportAbuse/report-abuse.component';
import { UserAboutComponent } from './userAbout/user-about.component';
import { ContactsDialogComponent } from './userMenu/user-menu.component';
import { ProfilePictureDialogComponent } from './userMenu/user-menu.component';
import { DescriptionDialogComponent } from './userMenu/user-menu.component';

import { TruncatePipe } from './userShared/trunc.pipe';

import { UserService } from './userShared/user.service';
import { PostService } from './userShared/post.service';

const UserRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'settings', component: UserSettingsComponent, canActivate: [UserService] },
            { path: 'settings/blockedUsers', component: BlockedUsersComponent, canActivate: [UserService] },
            { path: 'settings/securityQuestion', component: SecurityQuestionComponent, canActivate: [UserService] },
            { path: 'settings/reportAbuse', component: ReportAbuseComponent, canActivate: [UserService] },
            { path: 'posts', component: UserPostsComponent, canActivate: [UserService] },
            { path: 'addPost', component: PostAddComponent, canActivate: [UserService] },
            { path: 'editPost/:id', component: PostEditComponent, canActivate: [UserService] },
            { path: 'about', component: UserAboutComponent, canActivate: [UserService] },
            { path: '', component: UserMenuComponent, canActivate: [UserService] }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MdMenuModule,
        MdToolbarModule,
        MdButtonModule,
        MdCheckboxModule,
        MdCardModule,
        MdInputModule,
        MdGridListModule,
        MdTabsModule,
        MdRadioModule,
        MdListModule,
        MdDialogModule,
        MdSelectModule,
        MdIconModule,
        MdTooltipModule,
        MdSliderModule,
        MdAutocompleteModule,
        RouterModule.forChild(UserRoutes)
    ],
    exports: [
        RouterModule,
        TruncatePipe
    ],
    declarations: [
        UserNavComponent,
        UserComponent,
        UserMenuComponent,
        LoginComponent,
        SignUpComponent,
        UserPostsComponent,
        PostAddComponent,
        PostEditComponent,
        UserSettingsComponent,
        BlockedUsersComponent,
        SecurityQuestionComponent,
        ReportAbuseComponent,
        UserAboutComponent,
        BlockedUsersDialogComponent,
        ContactsDialogComponent,
        ProfilePictureDialogComponent,
        DescriptionDialogComponent,
        TruncatePipe
    ],
    providers: [
        UserService,
        PostService
    ],
    entryComponents: [
        BlockedUsersDialogComponent,
        ContactsDialogComponent,
        ProfilePictureDialogComponent,
        DescriptionDialogComponent
    ]
})

export class UserModule {}
