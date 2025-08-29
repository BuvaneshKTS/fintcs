import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocietyUsersService } from '../society-users.service';
import { User, RegisterRequest } from '../../../shared/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  isSaving = false;
  userId: number | null = null;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private societyUsersService: SocietyUsersService,
    private authService: AuthService
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    // Check if user is admin
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/society-users']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'create') {
      this.isEditMode = true;
      this.userId = +id;
      this.loadUser();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      EDPNo: [''],
      Name: [''],
      AddressOffice: [''],
      AddressResidential: [''],
      Designation: [''],
      PhoneOffice: [''],
      PhoneResidential: [''],
      Mobile: ['']
    });
  }

  loadUser(): void {
    if (!this.userId) return;
    
    this.isLoading = true;
    this.societyUsersService.getById(this.userId).subscribe({
      next: (res) => {
        if (res.success) {
          this.user = res.data;
          this.populateForm();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.isLoading = false;
      }
    });
  }

  populateForm(): void {
    if (!this.user) return;

    this.userForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      phone: this.user.phone,
      EDPNo: this.user.details?.EDPNo || '',
      Name: this.user.details?.Name || '',
      AddressOffice: this.user.details?.AddressOffice || '',
      AddressResidential: this.user.details?.AddressResidential || '',
      Designation: this.user.details?.Designation || '',
      PhoneOffice: this.user.details?.PhoneOffice || '',
      PhoneResidential: this.user.details?.PhoneResidential || '',
      Mobile: this.user.details?.Mobile || ''
    });

    // Disable username and EDPNo in edit mode as per requirements
    if (this.isEditMode) {
      this.userForm.get('username')?.disable();
      this.userForm.get('EDPNo')?.disable();
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSaving = true;
      const formData = this.userForm.getRawValue() as RegisterRequest;

      const operation = this.isEditMode && this.userId
        ? this.societyUsersService.update(this.userId, formData)
        : this.societyUsersService.create(formData);

      operation.subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/society-users']);
          } else {
            alert('Failed to save user: ' + res.message);
          }
          this.isSaving = false;
        },
        error: (error) => {
          console.error('Error saving user:', error);
          alert('Failed to save user. Please try again.');
          this.isSaving = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/society-users']);
  }

  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}