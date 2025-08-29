// src/app/features/society/society-config/society-config.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SocietyService } from '../../../core/services/society.service';

@Component({
  selector: 'app-society-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './society-config.component.html',
  styleUrls: ['./society-config.component.css']
})


export class SocietyConfigComponent implements OnInit {
  societyForm: FormGroup;
  isLoading = false;
  activeTab = 'basic';
  societyId: number | null = null;
  pendingChanges: any = null;
  isEditMode = false; // edit mode flag
  isAdminUser = false;

  toggleEditMode() {
    console.log('Before:', this.isEditMode);
    this.isEditMode = !this.isEditMode;
    console.log('After:', this.isEditMode);
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private societyService: SocietyService
  ) {
    this.societyForm = this.fb.group({
      societyName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      fax: [''],
      email: ['', [Validators.email]],
      website: [''],

      // Interest
      dividendRate: [0, [Validators.required, Validators.min(0)]],
      odRate: [0, [Validators.required, Validators.min(0)]],
      cdRate: [0, [Validators.required, Validators.min(0)]],
      loanRate: [0, [Validators.required, Validators.min(0)]],
      emergencyLoanRate: [0, [Validators.required, Validators.min(0)]],
      lasRate: [0, [Validators.required, Validators.min(0)]],

      // Limits
      shareLimit: [0, [Validators.required, Validators.min(0)]],
      loanLimit: [0, [Validators.required, Validators.min(0)]],
      emergencyLoanLimit: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin(); // assign once
    console.log('Is Admin User:', this.isAdminUser);
    
    this.loadSocietyData();
    this.checkPendingChanges();
  }

  loadSocietyData(): void {
    this.societyService.getSociety().subscribe(res => {
      if (res.success && res.data) {
        console.log(res.data);
        this.societyId = res.data.id;

        let tabs: any = {};
        try {
          tabs = res.data.tabs ? JSON.parse(res.data.tabs) : {};
        } catch (e) {
          console.error("Invalid tabs JSON", e);
        }

        this.societyForm.patchValue({
          societyName: res.data.societyName,
          registrationNumber: res.data.registrationNumber,
          address: res.data.address,
          city: res.data.city,
          phone: res.data.phone,
          fax: res.data.fax,
          email: res.data.email,
          website: res.data.website,

          // ✅ use lowercase keys from API
          dividendRate: tabs.interest?.dividend ?? 0,
          odRate: tabs.interest?.od ?? 0,
          cdRate: tabs.interest?.cd ?? 0,
          loanRate: tabs.interest?.loan ?? 0,
          emergencyLoanRate: tabs.interest?.emergencyLoan ?? 0,
          lasRate: tabs.interest?.las ?? 0,

          shareLimit: tabs.limit?.share ?? 0,
          loanLimit: tabs.limit?.loan ?? 0,
          emergencyLoanLimit: tabs.limit?.emergencyLoan ?? 0
        });
      }
    });
  }


  checkPendingChanges(): void {
    this.societyService.getPendingChanges().subscribe(res => {
      if (res.success && res.data?.hasPendingChanges) {
        this.pendingChanges = JSON.parse(res.data.pendingChanges);
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onSubmit(): void {
    // only admin can submit configs
    if (!this.isAdmin()) return;

    if (this.societyForm.valid) {
      this.isLoading = true;
      const values = this.societyForm.value;

      const payload = {
        societyName: values.societyName,
        registrationNumber: values.registrationNumber,
        address: values.address,
        city: values.city,
        phone: values.phone,
        fax: values.fax,
        email: values.email,
        website: values.website,
        tabs: {
          interest: {
            dividend: values.dividendRate,
            od: values.odRate,
            cd: values.cdRate,
            loan: values.loanRate,
            emergencyLoan: values.emergencyLoanRate,
            las: values.lasRate,
          },
          limit: {
            share: values.shareLimit,
            loan: values.loanLimit,
            emergencyLoan: values.emergencyLoanLimit,
          }
        }
      };

      this.societyService.updateSociety(payload).subscribe({
        next: (res) => {
          this.isLoading = false;
          alert(res.message || 'Changes submitted for approval!');
          this.checkPendingChanges();
        },
        error: () => {
          this.isLoading = false;
          alert('Error while updating society');
        }
      });
    }
  }

  approveChanges(): void {
    // approval should be by normal users only
    if (this.isAdmin()) return;

    this.societyService.approveChanges().subscribe({
      next: (res) => {
        alert(res.message || 'Changes approved successfully!');
        this.pendingChanges = null;
        this.loadSocietyData();
      },
      error: () => alert('Error approving changes')
    });
  }

  isAdmin(): boolean {
    console.log(this.authService.isAdmin());
    
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }
}



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { AuthService } from '../../../core/services/auth.service';
// import { SocietyService } from '../../../core/services/society.service';

// @Component({
//   selector: 'app-society-config',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     RouterModule
//   ],
//   templateUrl: './society-config.component.html',
//   styleUrls: ['./society-config.component.css']
// })
// export class SocietyConfigComponent implements OnInit {
//   societyForm: FormGroup;
//   isLoading = false;
//   activeTab = 'basic';
//   societyId: number | null = null;
//   pendingChanges: any = null;
//   isEditMode = false; // 🔹 edit mode flag
//   originalData: any = null; // 🔹 store original values to restore on cancel

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private societyService: SocietyService
//   ) {
//     this.societyForm = this.fb.group({
//       societyName: [{ value: '', disabled: true }, Validators.required],
//       registrationNumber: [{ value: '', disabled: true }, Validators.required],
//       address: [{ value: '', disabled: true }, Validators.required],
//       city: [{ value: '', disabled: true }, Validators.required],
//       phone: [{ value: '', disabled: true }, Validators.required],
//       fax: [{ value: '', disabled: true }],
//       email: [{ value: '', disabled: true }, [Validators.email]],
//       website: [{ value: '', disabled: true }],

//       dividendRate: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
//       odRate: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
//       cdRate: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
//       loanRate: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
//       emergencyLoanRate: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
//       lasRate: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],

//       shareLimit: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
//       loanLimit: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
//       emergencyLoanLimit: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
//     });
//   }

//   ngOnInit(): void {
//     this.loadSocietyData();
//     this.checkPendingChanges();
//   }
  
//   loadSocietyData(): void {
//     this.societyService.getSociety().subscribe(res => {
//       if (res.success && res.data) {
//         console.log(res.data);
//         this.societyId = res.data.id;

//         let tabs: any = {};
//         try {
//           tabs = res.data.tabs ? JSON.parse(res.data.tabs) : {};
//         } catch (e) {
//           console.error("Invalid tabs JSON", e);
//         }

//         const formData = {
//           societyName: res.data.societyName,
//           registrationNumber: res.data.registrationNumber,
//           address: res.data.address,
//           city: res.data.city,
//           phone: res.data.phone,
//           fax: res.data.fax,
//           email: res.data.email,
//           website: res.data.website,

//           dividendRate: tabs.interest?.dividend ?? 0,
//           odRate: tabs.interest?.od ?? 0,
//           cdRate: tabs.interest?.cd ?? 0,
//           loanRate: tabs.interest?.loan ?? 0,
//           emergencyLoanRate: tabs.interest?.emergencyLoan ?? 0,
//           lasRate: tabs.interest?.las ?? 0,

//           shareLimit: tabs.limit?.share ?? 0,
//           loanLimit: tabs.limit?.loan ?? 0,
//           emergencyLoanLimit: tabs.limit?.emergencyLoan ?? 0
//         };

//         this.societyForm.patchValue(formData);
//         this.originalData = formData; // 🔹 store original for cancel
//       }
//     });
//   }

//   checkPendingChanges(): void {
//     this.societyService.getPendingChanges().subscribe(res => {
//       if (res.success && res.data?.hasPendingChanges) {
//         this.pendingChanges = JSON.parse(res.data.pendingChanges);
//       }
//     });
//   }

//   setActiveTab(tab: string): void {
//     this.activeTab = tab;
//   }

//   toggleEditMode(): void {
//     if (!this.isAdmin()) return;

//     this.isEditMode = !this.isEditMode;

//     if (this.isEditMode) {
//       this.societyForm.enable();
//     } else {
//       this.societyForm.disable();
//       this.societyForm.patchValue(this.originalData); // restore original values
//     }
//   }

//   onSubmit(): void {
//     if (!this.isAdmin()) return;

//     if (this.societyForm.valid) {
//       this.isLoading = true;
//       const values = this.societyForm.value;

//       const payload = {
//         societyName: values.societyName,
//         registrationNumber: values.registrationNumber,
//         address: values.address,
//         city: values.city,
//         phone: values.phone,
//         fax: values.fax,
//         email: values.email,
//         website: values.website,
//         tabs: {
//           interest: {
//             dividend: values.dividendRate,
//             od: values.odRate,
//             cd: values.cdRate,
//             loan: values.loanRate,
//             emergencyLoan: values.emergencyLoanRate,
//             las: values.lasRate,
//           },
//           limit: {
//             share: values.shareLimit,
//             loan: values.loanLimit,
//             emergencyLoan: values.emergencyLoanLimit,
//           }
//         }
//       };

//       this.societyService.updateSociety(payload).subscribe({
//         next: (res) => {
//           this.isLoading = false;
//           alert(res.message || 'Changes submitted for approval!');
//           this.checkPendingChanges();
//           this.isEditMode = false;
//           this.societyForm.disable();
//           this.originalData = values; // update original values
//         },
//         error: () => {
//           this.isLoading = false;
//           alert('Error while updating society');
//         }
//       });
//     }
//   }

//   approveChanges(): void {
//     if (this.isAdmin()) return;

//     this.societyService.approveChanges().subscribe({
//       next: (res) => {
//         alert(res.message || 'Changes approved successfully!');
//         this.pendingChanges = null;
//         this.loadSocietyData();
//       },
//       error: () => alert('Error approving changes')
//     });
//   }

//   isAdmin(): boolean {
//     return this.authService.isAdmin();
//   }

//   logout(): void {
//     this.authService.logout();
//   }
// }
