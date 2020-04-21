import { Component, OnInit } from '@angular/core';
import { ApiService } from "./services/api.service";
import { Student } from  './models/student.model';
import { Department } from  './models/department.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'for-asp';
  public studentList: Student[] = [];
  public departmentList: Department[] = [];
  public chosenDepartament: number = null;
  public editDepId: number = null;


  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.apiService.getAllDepartments().subscribe( (departments: Department[]) => {
      this.departmentList = departments;
      this.apiService.getAllStudents().subscribe( (students: Student[]) => {
        this.studentList = students;
      });
    });

  }

  deleteStudentById(studentId: number){
    this.apiService.deleteStudentById(studentId).subscribe( (newStudents: Student[]) => {
      this.studentList = newStudents;
    });
  }

  showAddStudForm(departmentId: number){
    this.chosenDepartament = departmentId;
    let addStudForm: any = document.getElementsByClassName("add_student_form")[0];
    addStudForm.style.display = "block";
  }

  closeStudentForm(){
    let fname: any = (<HTMLInputElement>document.getElementsByClassName("add_stud_Fname")[0]);
    fname.value = "";
    let lname: any = (<HTMLInputElement>document.getElementsByClassName("add_stud_Lname")[0]);
    lname.value = "";
    let addStudForm: any = document.getElementsByClassName("add_student_form")[0];
    addStudForm.style.display = "none";
  }

  deleteDepartmentById(departmentId: number){
    this.apiService.deleteDepartmentById(departmentId).subscribe( (departments: Department[]) => {
      this.departmentList = departments;
      this.apiService.getAllStudents().subscribe( (students: Student[]) => {
        this.studentList = students;
      });
    });
  }

  addStudent(){
    let fname: any = (<HTMLInputElement>document.getElementsByClassName("add_stud_Fname")[0]).value;
    let lname: any = (<HTMLInputElement>document.getElementsByClassName("add_stud_Lname")[0]).value;
    let newStudent: Student = new Student(fname, lname, this.chosenDepartament);
    this.apiService.addStudent(newStudent).subscribe( (students: Student[]) => {
      this.studentList = students;
      this.closeStudentForm();
    });
  }

  addOrEditDepartment(){
    let name: any = (<HTMLInputElement>document.getElementsByClassName("add_depart_name")[0]).value;
    let description: any = (<HTMLInputElement>document.getElementsByClassName("add_depart_description")[0]).value;
    let newDepartment: Department = new Department(name, description);
    if(this.editDepId){
      newDepartment.id = this.editDepId;
      this.apiService.editDepartment(newDepartment).subscribe( (departments: Department[]) => {
        this.departmentList = departments;
        this.apiService.getAllStudents().subscribe( (students: Student[]) => {
          this.studentList = students;
        });
      });
    } else{
      this.apiService.addDepartment(newDepartment).subscribe( (departments: Department[]) => {
        this.departmentList = departments;
        this.apiService.getAllStudents().subscribe( (students: Student[]) => {
          this.studentList = students;
        });
      });
    }

    this.closeDepartmentForm();

  }

  closeDepartmentForm(){
    let name: any = (<HTMLInputElement>document.getElementsByClassName("add_depart_name")[0]);
    name.value = "";
    let description: any = (<HTMLInputElement>document.getElementsByClassName("add_depart_description")[0]);
    description.value = "";

    let addDepForm: any = document.getElementsByClassName("add_department_form")[0];
    addDepForm.style.display = "none";

    this.editDepId = null;
  }

  showDepartmentForm(department?: Department){
    let addDepForm: any = document.getElementsByClassName("add_department_form")[0];
    addDepForm.style.display = "block";

    if(department){
      let name: any = (<HTMLInputElement>document.getElementsByClassName("add_depart_name")[0]);
      name.value = department.name;
      let description: any = (<HTMLInputElement>document.getElementsByClassName("add_depart_description")[0]);
      description.value = department.description;

      this.editDepId = department.id;
    }

  }





}
