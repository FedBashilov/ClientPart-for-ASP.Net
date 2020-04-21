import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';

import { Student } from  './../models/student.model';
import { Department } from  './../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public PHP_API_SERVER = "https://localhost:44321";

  constructor(private httpClient: HttpClient) {}


//student

  getAllStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.PHP_API_SERVER}/API/Students`);
  }
  
  addStudent(newStudent:Student): Observable<Student[]>{
    return this.httpClient.post<Student[]>(`${this.PHP_API_SERVER}/API/Students`, newStudent );
  }

  deleteStudentById(id : number): Observable<Student[]>{
    return this.httpClient.delete<Student[]>(`${this.PHP_API_SERVER}/API/Students?id=${id}`);
  }



//department

  getAllDepartments(): Observable<Department[]>{
    return this.httpClient.get<Department[]>(`${this.PHP_API_SERVER}/API/Departments`);
  }

  addDepartment(newDepartment: Department): Observable<Department[]>{
    return this.httpClient.post<Department[]>(`${this.PHP_API_SERVER}/API/Departments`, newDepartment );
  }

  editDepartment(newDepartment: Department): Observable<Department[]>{
    return this.httpClient.put<Department[]>(`${this.PHP_API_SERVER}/API/Departments`, newDepartment );
  }

  deleteDepartmentById(id : number): Observable<Department[]>{
    return this.httpClient.delete<Department[]>(`${this.PHP_API_SERVER}/API/Departments?id=${id}`);
  }


}
