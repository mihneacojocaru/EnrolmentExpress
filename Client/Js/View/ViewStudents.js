import Data from "../data.js";
import ViewEnrolments from "./ViewEnrolments.js";
import ViewHome from "./ViewHome.js";

export default class ViewStudents{

    constructor(home){
        this.home = home;
        this.home.returnHome();
    }

    eventHandler = e => {
        e.preventDefault();
        let obj = e.target;
        if(obj.id == 'goBack'){
            this.home.pageBuilder('Enrolment&#x2122;');
        }else if(obj.id == 'updateStBtn'){
            this.updateStudent(obj);
        }else if(obj.id == 'saveStBtn'){
            this.updateStudent(obj);
        }else if(obj.id == 'deleteStBtn'){
            this.deleteStudent(obj);
        }else if(obj.id == 'addStudent'){
            this.addStudent();
        }else if(obj.id == 'addStBtn'){
            this.postStudent(obj);
        }else if(obj.id == 'cancel'){
            this.home.pageBuilder('Students');
            this.studentsMain();
        }else if(obj.id == 'enrolments'){
            this.home.pageBuilder('Enrolments');
            const viewEnrolments = new ViewEnrolments(this);
            viewEnrolments.enrolmentsMain();
        }
    }

    studentsMain = () => {

        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `
                            <div class="fcnBtn">
                                <div id="addStudent" class="navBtn">
                                    <h2 id="addStudent">Add Student</h2>
                                </div>
                                <div id="enrolments" class="navBtn">
                                    <h2 id="enrolments">Enrolments</h2>
                                </div>
                                <div id="goBack" class="navBtn">
                                    <h2 id="goBack">Return to Main</h2>
                                </div>
                            </div>
                            <div class="addSection"></div>
                            <div class="generic-table">
                                <h2>Student List</h2>
                                <table>
                                    <thead>
                                        <th>Id</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Date of Birth</th>
                                        <th>Option</th>
                                    </thead>
                                    <tbody id="studentListTable">
                                        
                                    </tbody>
                                </table>
                            </div>`;
        main.addEventListener('click', this.eventHandler);
        this.populateStudentTable();
    }

    populateStudentTable = async () => {
        try {
            const students = await this.getStudents();
            students.forEach(element => {
                this.createStudentRow(element);
            });

        } catch (error) {
            console.warn(error);
        }
    }

    createStudentRow = (obj) => {
        let tRow = `<tr>
                        <td>${obj.id}</td>
                        <td>${obj.first_name}</td>
                        <td>${obj.last_name}</td>
                        <td>${obj.date_of_birth}</td>
                        <td>
                            <button id="updateStBtn">Update</button>
                            <button id="deleteStBtn">Delete</button>
                        </td>
                    </tr>`;
        let tBody = document.getElementById('studentListTable');   
        tBody.innerHTML += tRow;
    }

    deleteStudent = async (obj) => {
        let id = obj.parentElement.parentElement.children[0].textContent;

        await this.deleteStudentApi(parseInt(id));

        this.home.pageBuilder('Students');
        this.studentsMain();
    }

    updateStudent = (obj) => {
        if(obj.id == 'updateStBtn'){
           let id = obj.parentElement.parentElement.children[0];
           let fName = obj.parentElement.parentElement.children[1];
           let lName = obj.parentElement.parentElement.children[2];
           let date = obj.parentElement.parentElement.children[3];

           this.object = {}
           
           this.object.id = parseInt(id.textContent);
           this.object.first_name = fName.textContent;
           this.object.last_name = lName.textContent;
           this.object.date_of_birth = date.textContent;

           fName.innerHTML = `<input id="fName" class="updateInput" type="text" value="${this.object.first_name}"></input>`;
           lName.innerHTML = `<input id="lName" class="updateInput" type="text" value="${this.object.last_name}"></input>`;
           date.innerHTML = `<input id="dob" class="updateInput" type="text" value="${this.object.date_of_birth}"></input>`;

           obj.textContent = "Save";
           obj.id = "saveStBtn";
        }else if(obj.id == 'saveStBtn'){
            let fName = document.getElementById('fName');
            let lName = document.getElementById('lName');
            let date = document.getElementById('dob');

            this.object.first_name = fName.value.trim();
            this.object.last_name = lName.value.trim();
            this.object.date_of_birth = date.value.trim();

            this.putStudent(this.object);

            this.home.pageBuilder('Students');
            this.studentsMain();
        }
    }

    postStudent = async (obj) => {
        let fName = obj.parentElement.parentElement.children[1].children[1];
        let lName = obj.parentElement.parentElement.children[1].children[3];
        let date = obj.parentElement.parentElement.children[1].children[5];

        let object = {};
        object.first_name = fName.value;
        object.last_name = lName.value;
        object.date_of_birth = date.value;

        await this.postStudentApi(object);

        fName.value = '';
        lName.value = '';
        date.value = '';

        this.home.pageBuilder('Students');
        this.studentsMain();
        this.populateStudentTable();
    }

    addStudent = () => {
        let addSection = document.querySelector('.addSection');
        addSection.innerHTML = `<div class="addSectionStyle">
                                    <h2>Add new student</h2>
                                    <form action="#">
                                        <label for="fName">Frist Name</label>
                                        <input type="text" name="fName">
                                        <label for="lName">Last Name</label>
                                        <input type="text" name="lName">
                                        <label for="dOB">Date of Birth</label>
                                        <input type="text" name="dOB">
                                    </form>
                                    <div class="buttons">
                                        <button id="addStBtn">Add Student</button>
                                        <button id="cancel">Cancel</button>
                                    </div>
                                </div>`;
    }

    //+++ API FUNCTIONS

    getStudents = async () => {
        try {
            console.log('from getStudents - fetch')
            const data = new Data();
            const students = await data.getStudents();
            return students;
        } catch (error) {
            console.warn(error);
        }
        
    }

    putStudent = async (body) =>{
        try {
            const data = new Data();
            const updateStudent = await data.updateStudent(body);
            return updateStudent;
        } catch (error) {
            console.warn(error);
        }
    }

    deleteStudentApi = async (id) => {
        try {
            const data = new Data();
            const del = await data.deleteStudent(id);
            return del;
        } catch (error) {
            console.warn(error);
        }
    }

    postStudentApi = async (body) => {
        try {
            const data = new Data();
            const postStudent = await data.postStudent(body);
            return postStudent;
        } catch (error) {
            console.warn(error);
        }
    }


}