/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDTO } from 'src/dto/create-student.dto';
import { UpdateStudentDTO } from 'src/dto/update-student.dto';
import { IStudent } from 'src/interface/student.interface';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}

  async createStudent(CreateStudentDTO:CreateStudentDTO):Promise<IStudent>{
    
    const newStudent = await this.studentModel.create(CreateStudentDTO)
    
    return newStudent;
  }


  async getAllStudents():Promise<IStudent[]>{
    const studentData = await this.studentModel.find()

    if(!studentData || studentData.length == 0){
      throw new NotFoundException("Student Data Not Found")
    }

    return studentData;
  }
  
  // get a specific student by ID

  async getStudentId(StudentId:string):Promise<IStudent>{
    const existingStudent = await this.studentModel.findById(StudentId)

    if(!existingStudent){
      throw new NotFoundException(`Student ${StudentId} not found`)
    }

    return existingStudent;
  }


  // delete student by idea

  async deleteStudent(StudentId:string):Promise<IStudent>{
    const deleteStudent = await this.studentModel.findByIdAndDelete(StudentId)

    if(!deleteStudent){
      throw new NotFoundException(`Student ${StudentId} not found`)
    }

    return deleteStudent;
  }

  // updating existing student

  async updateStudent(StudentId:string, updateStudentDTO:UpdateStudentDTO):Promise<IStudent>{

    const existingStudent = await this.studentModel.findByIdAndUpdate(StudentId, updateStudentDTO, {new:true})


    if(!existingStudent){
      throw new NotFoundException(`Student ${StudentId} not found`)
    }

    return existingStudent;
  }
     
}
