import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


import { InstaPostService } from '../services/insta-post.service';

export interface DialogData {
  caption: string;
  name: string;
  post_image: string;

}


@Component({
  selector: 'app-insta-form',
  templateUrl: './insta-form.component.html',
  styleUrls: ['./insta-form.component.css']
})
export class InstaFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<InstaFormComponent>,
    private instaPostService: InstaPostService
  ) { }

  myForm: FormGroup;
  uploadResponse = { status: '', message: '', filePath: '' };
  error: string;

  ngOnInit() {
    this.myForm = this.fb.group({
      post_caption: '',
      post_image: ['']
    });
  }

  // event listener for uploading file
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('post_image').setValue(file);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSuccesPostSnack() {
    this.snackBar.open('Successfully', 'Posted Successfully', {
      duration: 2000
    });
  }

  onPost() {
    const formData = new FormData();
    formData.append('post_image', this.myForm.get('post_image').value);
    formData.append('post_caption', this.myForm.get('post_caption').value);

    this.instaPostService.createPost(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
        console.log(res);
        this.openSuccesPostSnack();
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
