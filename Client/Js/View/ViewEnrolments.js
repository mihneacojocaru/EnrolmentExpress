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

    cancelEnrolment = () => {
        let addSection = document.querySelector('.addSection');
        addSection.innerHTML = '';
    }

    returnHome = () => {
        console.log('aici')
        let home = new ViewHome();
        home.pageBuilder('Enrolment&#x2122;');
    }

    //+++ API FUNCTIONS

    getEnrolments = async () => {
        try {
            const data = new Data();
            const enrolments = await data.getEnrolments();
            return enrolments;
        } catch (error) {
            console.warn(error);
        }
    }
}