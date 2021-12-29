export default class ViewHome{
    constructor () {
        this.root = document.getElementById('root');
        this.root.innerHTML += this.nav();
        this.root.innerHTML += this.main();
    }

    nav = () => {
        return `<nav>
                    <h1 class="homeLink">Courses</h1>
                    <div class="elements">
                        <span>Sign Up</span>
                        <span>Sign In</span>
                    </div>
                </nav>`;
    }

    main = () => {
        return `<main>
                    <div class="cards-container">
                        <div class="card">
                            <span>Course</span>
                            <h2>Build a Basic Bookcase</h2>
                        </div>
                        <div class="card">
                            <span>Course</span>
                            <h2>Learn How to Program</h2>
                        </div>
                        <div class="card">
                            <span>Course</span>
                            <h2>Learn How to Test Programs</h2>
                        </div>
                        <div class="newCourse">
                            <h2>+ New Course</h2>
                        </div>
                    </div>
                </main>`;
    }
}