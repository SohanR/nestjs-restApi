import { Controller, Res } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateStudentDTO } from 'src/dto/create-student.dto';
import { UpdateStudentDTO } from 'src/dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(
    @Res() response,
    @Body() createStudentDTO: CreateStudentDTO,
  ) {
    try {
      const newStudent = await this.studentService.createStudent(
        createStudentDTO,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newStudent,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating student',
        statusCode: 400,
        error: 'Bad request',
      });
    }
  }

  @Get()
  async getAllStudents(@Res() response) {
    try {
      const studentData = await this.studentService.getAllStudents();

      return response.status(HttpStatus.OK).json({
        message: 'Students fetched successfully',
        studentData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Body() updateStudentDTO: UpdateStudentDTO,
    @Param('id') studentId: string,
  ) {
    try {
      const existingStudent = await this.studentService.updateStudent(
        studentId,
        updateStudentDTO,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Student has been updated successfully',
        existingStudent,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const deletedStudent = await this.studentService.deleteStudent(studentId);

      return response.status(HttpStatus.OK).json({
        message: 'Student has been deleted successfully',
        deletedStudent,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
