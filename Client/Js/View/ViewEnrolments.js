import Data from "../data.js";
import ViewHome from "./ViewHome.js";
export default class ViewEnrolments{
    constructor(home){
        this.home = home;
        this.populateEnrolmentTable();
        this.nav = document.querySelector('nav');
        this.nav.addEventListener('click', (e)=> {
            if(e.target.id == 'toMain'){
                this.returnHome();
            }
        });
    }

    eventHandler = (e) => {
        e.preventDefault();
        let obj = e.target;
        if(obj.id == 'addEnrolment'){
            this.addEnrolment();
        }else if(obj.id == 'cancel2'){
            this.cancelEnrolment();
        }else if(obj.id == 'submitBtn'){
            this.putEnrolment(obj);
        }else if(obj.id == 'updBtn'){
            this.updateAndDelete(obj);
        }else if(obj.id == 'saveBtn'){
            this.updateAndDelete(obj);
        }else if(obj.id == 'delBtn'){
            this.updateAndDelete(obj);
        }else if(obj.id == 'postBtn'){
            this.postEnrolmentBtn(obj);
        }

    }

    enrolmentsMain = () => {
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

    returnHome = () => {
        console.log('aici')
        let home = new ViewHome();
        home.pageBuilder('Enrolment&#x2122;');
    }

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
                            <button id="updBtn">Update</button>
                            <button id="delBtn">Delete</button>
                        </td>
                    </tr>`;

        let tBody = document.getElementById('enrolmentBody');
        tBody.innerHTML += tRow;
    }

    addEnrolment = async () => {
        let addSection = document.querySelector('.addSection');
        addSection.innerHTML = `<div class="addSectionStyle">
                                    <h2>Enrol new student</h2>
                                    <form action="#">
                                        <label for="studentId">Student Id</label>
                                        <input type="text" name="studentId">
                                        <label for="courseId">Course Id</label>
                                        <select id="options"></select>
                                    </form>
                                    <div class="buttons">
                                        <button id="postBtn">Submit Enrolment</button>
                                        <button id="cancel2">Cancel</button>
                                    </div>
                                </div>`;

        let select = document.getElementById('options');
        try {
            const enrolments = await this.getCourses();
            enrolments.forEach( e => {
                select.innerHTML += `<option value="${e.course_id}">${e.course_id}</option>`;
            });
        } catch (error) {
            console.warn(error);
        }
    }

    postEnrolmentBtn = async (obj) => {
        let student_id = obj.parentElement.parentElement.children[1].children[1];
        let course_id = obj.parentElement.parentElement.children[1].children[3];

        let object = {};
        object.student_id = parseInt(student_id.value);
        object.course_id = course_id.value;
        object.created_at = "2021-04-02 09:01:56";

        this.postEnrolment(object);

        this.enrolmentsMain();
        setTimeout(()=>{this.populateEnrolmentTable();},100)
    }

    cancelEnrolment = () => {
        let addSection = document.querySelector('.addSection');
        addSection.innerHTML = '';
    }

    updateAndDelete = async (obj) => {
        if(obj.id == 'updBtn'){
            let student_id = obj.parentElement.parentElement.children[0];
            let course_id = obj.parentElement.parentElement.children[1];

            this.object = {};

            this.object.oldStudent_id = parseInt(student_id.textContent);
            this.object.oldCourse_id = course_id.textContent;

            student_id.innerHTML = `<input id="stId" class="updateInput" type="text" value="${this.object.oldStudent_id}"></input>`;
            course_id.innerHTML = `<select id="options"></select>`;

            let select = document.getElementById('options');
            try {
                const enrolments = await this.getCourses();
                enrolments.forEach( e => {
                    if(e.course_id == this.object.oldCourse_id){
                        select.innerHTML += `<option value="${e.course_id}">${e.course_id}</option>`;
                    } 
                });
                enrolments.forEach( e => {
                    if(e.course_id !== this.object.oldCourse_id){
                        select.innerHTML += `<option value="${e.course_id}">${e.course_id}</option>`;
                    }
                });
            } catch (error) {
                console.warn(error);
            }
            obj.textContent = 'Save';
            obj.id = 'saveBtn'
        }else if(obj.id == 'saveBtn'){
            let student_id = document.getElementById('stId');
            let course_id = document.getElementById('options');
            
            
            this.object.student_id = parseInt(student_id.value);
            this.object.course_id = course_id.value;
            
            this.putEnrolment(this.object);

            this.enrolmentsMain();
            setTimeout(()=>{this.populateEnrolmentTable();},100)
        }else if(obj.id == 'delBtn'){
            let student_id = obj.parentElement.parentElement.children[0];
            let course_id = obj.parentElement.parentElement.children[1];

            this.object = {};

            this.object.student_id = parseInt(student_id.textContent);
            this.object.course_id = course_id.textContent;

           this.deleteEnrolment(this.object);
          
           this.enrolmentsMain();
           setTimeout(()=>{this.populateEnrolmentTable();},150);
        }
    }

    //+++ API FUNCTIONS

    getCourses = async () => {
        try {
            const data = new Data();
            const courses = await data.getCourses();
            return courses;
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

    deleteEnrolment = async (obj) => {
        try {
            const data = new Data();
            const func = await data.deleteEnrolment(obj);
            return func;
        } catch (error) {
            console.warn(error);
        }
    }

    putEnrolment = async (obj) => {
        try {
            const data = new Data();
            const func = await data.updateEnrolment(obj);
            return func;
        } catch (error) {
            console.warn(error);
        }
    }

    postEnrolment = async (obj) => {
        try {
            const data = new Data();
            const postEnrol = await data.postEnrolment(obj);
            return postEnrol;
        } catch (error) {
            console.warn(error);
        }
    }
} 