import Data from "../data.js";

export default class ViewHome{
    constructor () {
        this.root = document.getElementById('root');
        this.pageBuilder('Enrolment&#x2122;');
        this.homePage();
        this.object = {};
    }

    pageBuilder = (item) => {
        this.root.innerHTML = '';
        this.root.innerHTML += this.nav(item);
        this.root.innerHTML += this.main();
    }

    eventHandler = (e) => {
            e.preventDefault();
            let obj = e.target;
            if(obj.id == 'courses'){
                this.pageBuilder('Courses');
                this.courses();
                this.populateCourses();
            }else if(obj.id == 'students'){
                this.pageBuilder('Students');
                this.students();
                this.populateStudentTable();
            }else if(obj.id == 'addStudent'){
                this.addStudent();
            }else if(obj.id == 'course1'){
                this.clickedCard(obj);
            }else if(obj.id == 'enrolments'){
                this.pageBuilder('Enrolments');
                this.enrolments();
                this.populateEnrolmentTable();
            }else if(obj.id == 'goBack'){
                this.pageBuilder('Enrolment&#x2122;');
                this.homePage();
            }else if(obj.id == 'goBack2'){
                this.pageBuilder('Courses');
                this.courses();
                this.populateCourses();
            }else if(obj.id == 'cancel3'){
                this.pageBuilder('Enrolment&#x2122;');
                this.homePage();
            }else if(obj.id == 'addStBtn'){
                this.postStudent(obj);
            }else if(obj.id == 'cancel'){
                this.pageBuilder('Students');
                this.students();
                this.populateStudentTable();
            }else if(obj.id == 'addEnrolment'){
                this.addEnrolment();
            }else if(obj.id == 'cancel2'){
                this.pageBuilder('Enrolments');
                this.enrolments();
                this.populateEnrolmentTable();
            }else if(obj.id == 'updateStBtn'){
                this.updateStudent(obj);
            }else if(obj.id == 'saveStBtn'){
                this.updateStudent(obj);
            }else if(obj.id == 'deleteStBtn'){
                this.deleteStudent(obj);
            }
    }

    nav = (item) => {
        return `<nav>
                    <h1 id="toMain" class="homeLink">${item}</h1>
                    <div class="elements">
                        <span id="signIn">Sign In</span>
                    </div>
                </nav>`;
    }

    main = () => {
        return `<main></main>`;
    }

    returnHome = () =>{
        let navBtn = document.querySelector('nav');
        navBtn.addEventListener('click',this.navFunctions);
    }

    navFunctions = (e) => {
        let obj = e.target;
        if(obj.id == 'toMain'){
            this.pageBuilder('Enrolment&#x2122;');
            this.homePage();
        }else if(obj.id == 'signIn'){
            console.log('test');
            this.pageBuilder('Enrolment&#x2122;');
            this.signIn();
        }

    }

    homePage = () => {
        this.returnHome();
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `<div class="container">
                                <div id='courses' class="card--">
                                    <h2 id='courses'>Courses</h2>
                                </div>
                                <div id='students' class="card--">
                                    <h2 id='students'>Students</h2>
                                </div>
                            </div>`;
        main.addEventListener('click',this.eventHandler);
        // let btn = document.getElementById('students');
        // btn.click();
    }

    courses = () => {
        this.returnHome();
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `<div class="fcnBtn">
                                <div id="goBack" class="navBtn">
                                    <h2 id="goBack">Return to Main</h2>
                                </div>
                            </div>
                            <div class="container-courses">
                                <div class="cards-container">
                                    
                                    <div class="newCourse">
                                        <h2>+ New Course</h2>
                                    </div>
                                </div>
                            </div>`;
        main.addEventListener('click',this.eventHandler);
        // let btn = document.getElementById('course1');
        // btn.click();
    }

    courseDetails = () => {
        this.returnHome();
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `<div class="fcnBtn">
                                <div class="navBtn">
                                    <h2>Update Course</h2>
                                </div>
                                <div class="navBtn">
                                    <h2>Delete Course</h2>
                                </div>
                                <div id="goBack2" class="navBtn">
                                    <h2 id="goBack2">Return to List</h2>
                                </div>
                            </div>
                            <div id="courseBox" class="course-box">
                                
                            </div>`;
        main.addEventListener('click',this.eventHandler);
    }

    students = () => {
        this.returnHome();
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
        // let btn = document.getElementById('addStudent');
        // btn.click();
    }

    enrolments = () => {
        this.returnHome();
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = `
                            <div class="fcnBtn">
                                <div id="addEnrolment" class="navBtn">
                                    <h2 id="addEnrolment">Add Enrolment</h2>
                                </div>
                                <div id="students" class="navBtn">
                                    <h2 id="students">Return to Students</h2>
                                </div>
                            </div>
                            <div class="addSection"></div>
                            <div class="generic-table">
                                <h2>Course Enrolments</h2>
                                <table>
                                    <thead>
                                        <th>Student Id</th>
                                        <th>Course Id</th>
                                        <th>Created at</th>
                                        <th>Option</th>
                                    </thead>
                                    <tbody id="enrolmentBody"></tbody>
                                </table>
                            </div>
                                `;
        main.addEventListener('click', this.eventHandler);
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

    addEnrolment = () => {
        let addSection = document.querySelector('.addSection');
        addSection.innerHTML = `<div class="addSectionStyle">
                                    <h2>Enrol new student</h2>
                                    <form action="#">
                                        <label for="studentId">Student Id</label>
                                        <input type="text" name="studentId">
                                        <label for="courseId">Course Id</label>
                                        <input type="text" name="courseId">
                                    </form>
                                    <div class="buttons">
                                        <button id="addEnrolment">Submit Enrolment</button>
                                        <button id="cancel2">Cancel</button>
                                    </div>
                                </div>`;
    }

    //+++ API Functions

    getCourses = async () => {
        try {
            const data = new Data();
            const courses = await data.getCourses();
            return courses;
        } catch (error) {
            console.warn(error);
        }
    }

    getStudents = async () => {
        try {
            const data = new Data();
            const students = await data.getStudents();
            return students;
        } catch (error) {
            console.warn(error);
        }
        
    }

    getEnrolments = async () => {
        try {
            const data = new Data();
            const enrolments = await data.getEnrolments();
            return enrolments;
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

    //+++ HTML Functions

//--- Courses
    populateCourses = async () => {
        try {
            const courses = await this.getCourses();
            courses.forEach(e => {
                this.createCourseCard(e);
            });
        } catch (error) {
            console.warn(error);
        }
    }

    createCourseCard = (obj) => {
        let card = `
                        <span id="course1">${obj.department}</span>
                        <h2 id="course1">${obj.course_name}</h2></br>
                        <span id="course1">Course Id: ${obj.course_id}</span>
                    `;
        let div = document.createElement('div');
        div.id = 'course1';
        div.className = 'card';
        div.innerHTML = card;
        let cardContainer = document.querySelector('.cards-container');
        cardContainer.insertBefore(div,cardContainer.children[0]);
    }

    populateCourseDetails = async (title,name,id) => {
        try {
            const courses = await this.getCourses();
            courses.forEach( e=>{
                if(title == e.department && name == e.course_name){
                    this.pageBuilder('Course Details');
                    this.courseDetails();
                    this.createCourseDetailCard(e);
                }
            });
        } catch (error) {
            console.warn(error);
        }
    }

    createCourseDetailCard = (obj) => {
        let card = `<img src="https://picsum.photos/id/1073/300/200" alt="info picture">
        <h4>${obj.course_name}</h4>
        <p>${obj.department}</p>
        <p>Course ID: ${obj.course_id}</p>`;
        let cBox = document.getElementById('courseBox');
        cBox.innerHTML = card;
    }

    clickedCard = (obj) => {
        
        if(obj.tagName == 'DIV'){
            let title = obj.children[0].textContent;
            let name = obj.children[1].textContent;
            let id = obj.children[3].textContent;
            this.populateCourseDetails(title,name,id);
        }else{
            obj = obj.parentElement;
            let title = obj.children[0].textContent;
            let name = obj.children[1].textContent;
            let id = obj.children[3].textContent;
            this.populateCourseDetails(title,name,id);
        }
    }

//--- Students
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

        this.pageBuilder('Students');
        this.students();
        this.populateStudentTable();
    }

    updateStudent = async (obj) => {
        if(obj.id == 'updateStBtn'){
           let id = obj.parentElement.parentElement.children[0];
           let fName = obj.parentElement.parentElement.children[1];
           let lName = obj.parentElement.parentElement.children[2];
           let date = obj.parentElement.parentElement.children[3];
           
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

            await this.putStudent(this.object);

            this.pageBuilder('Students');
            this.students();
            await this.populateStudentTable();
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

        this.pageBuilder('Students');
        this.students();
        this.populateStudentTable();
    }
//--- Enrolments
    
    populateEnrolmentTable = async () => {
        try {
            const enrolments = await this.getEnrolments();
            enrolments.forEach( e => {
                this.createEnrolmentRow(e);
            })
        } catch (error) {
            console.warn(error);
        }
    }

    createEnrolmentRow = (obj) => {
        let tRow = `<tr>
                        <td>${obj.student_id}</td>
                        <td>${obj.course_id}</td>
                        <td>${obj.created_at}</td>
                        <td>
                            <button>Update</button>
                            <button>Delete</button>
                        </td>
                    </tr>`;

        let tBody = document.getElementById('enrolmentBody');
        tBody.innerHTML += tRow;
    }

//--- SignIn

    signIn = () => {
        let content = `
        <div class="signIn">
            <div class="addSectionStyle">
                <h2>Sign In</h2>
                <form action="#">
                    <label for="fName">Username</label>
                    <input type="text" name="fName">
                    <label for="lName">Password</label>
                    <input type="password" name="lName">
                </form>
                <div class="buttons">
                    <button id="cancel3">Sign In</button>
                    <button id="cancel3">Cancel</button>
                </div>
            </div>
        </div>
        `;
        let main = document.querySelector('main');
        main.innerHTML = '';
        main.innerHTML = content;
        main.addEventListener('click',this.eventHandler);
    }
}