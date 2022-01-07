export default class Data{
    api(path, method = "GET", body = null) {
        let url = path;
    
        const options = {
          method,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        };
    
        if (body != null) {
          options.body = JSON.stringify(body);
        }
    
        return fetch(url, options);
    }

    //+++ GET

    async getCourses(){
        try {
            const response = await this.api('http://localhost:3000/api/v1/courses');
            if(response.status === 200){
                return response.json();
            }else{
                return Promise.reject('error');
            }
            
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async getStudents(){
        try {
            const response = await this.api('http://localhost:3000/api/v1/students');

            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject('error');
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getEnrolments(){
        try {
            const response = await this.api('http://localhost:3000/api/v1/enrolments');

            if (response.status === 200) {
                return response.json();
            } else {
                return Promise.reject('error');
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    //+++ PUT

    async updateStudent(body){
        try {
            const response = await this.api(`http://localhost:3000/api/v1/students/`,'PUT',body);
            return response.json();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    //+++ DELETE

    async deleteStudent(id){
        try {
            const response = await this.api(`http://localhost:3000/api/v1/students/${id}`,'DELETE')
            return response.json();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    //+++

    async postStudent(body){
        try {
            const response = await this.api('http://localhost:3000/api/v1/students','POST',body);
            return response.json();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}