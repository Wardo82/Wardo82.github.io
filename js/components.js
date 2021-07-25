//Creating the Vue object.
const rootComponent = {
  data() {
    return {
      pollingId: null,
      selectedItem: {},
      flags: {'home-view': false,
              'projects-view': false,
              'experience-view': false,
            },
      experience: [ // With this i understand Working Experience
        {title: "Davantis SL. Software Developer Intern, Barcelona, Spain.",
         date: "10/2019 – 06/2021",
         description: "Among the tasks that i was given were: (1) Modernise the product’s User Interface " +
                      "in .Net technologies, (2) design and implementation of internal software written in " +
                      "Python for the product’s performance tracking and (3) tasks of different levels of " +
                      "involvement in the main product such as database engine version update, addition of basic " +
                      "security features and bug fixes. As a side note, i took part in the main development process of their own " +
                      "implementation of the SCRUM methodology.",
         img: "assets/davantis.png"},
        {title: "MOVE Project for CubeSat development. Participating Student, Munich, Germany.",
          date: "Summer Semester 2019",
          description: "As part of my Erasmus Exchange, i joined the MOVE project for CubeSat development " +
          "the university offers. Students gather and discuss the design, prototyping and construction of " +
          "all the subsystems necessary for the creation of a CubeSat. I helped the Communications subsystem with coding and simulation " +
          "of the DVBS2 communication standard on MATLAB using the comm library and later own implementations of " +
          "BCH and LDPC codes.",
          img: "assets/tum_university.jpg"},
         ],
      projects:[ // All projects i've worked and what i did in those projects.
        {title: "Quadruped robot",
         date: "1 semester project in 2017",
         description: "RaspberryPi powered 3D printed quadruped robot. I helped in ",
         img: "assets/quadruped.JPG"},
       {title: "DVBS2 MATLAB simulation for CubeSat project",
        date: "1 semester project in 2019",
        description: "Matlab simulation of the DVBS2 satellite communication "+
        "standard for the MOVE project and TU Munich. This simulation later became the basis for my " +
        "bacherlor's degree thesis. The whole code can be found at my Github page.",
        img: "assets/matlab.jpg"},
        {title: "Rapid prototyping on FPGA of a DVB-S2 CubeSat transmitter",
         date: "1 semester project in 2020/2021",
         description: "A prototype of a DVB-S2 transmitter was implemented on Matlab/Simulink with the capacity to be synthesised and its bitstream downloaded onto a Zynq XC7Z020 thanks to the HDL Coder and HDL Verifier add ons. This was successful thanks to the low amount of resources the blocks’ implementation required (less than 10% of the FPGA). These components were verified individually and combined to shape the transmitter which was also shown to use a very small fraction of all the resources present on the Zedboard’s FPGA.",
         img: "assets/zynq_boards.jpeg"},
       ],
    }
  },
  // This method is called when the vue application is mounted into a DOM element.
  mounted: function() {
  },
  // Before unmounting the vue application you can clear the setInterval to stop the polling over the mail list.
  beforeUnmount: function() {
  },

  methods: {
    // Sets all elements of the flags dictionary to false
    cleanFlags: function() {
      for (const item in this.flags) {
        this.flags[item] = false;
      }
    },
    itemSelected: function (item) {
      console.log("[titleSelected] Selected title is: " + item.title);
      this.cleanFlags();
      this.selectedItem = item;
      this.flags[item.title.toLowerCase() + "-view"] = true;
    },
  }, //end methods
  template:
    `
    <h1 id="main_title">Eduardo <br> Flores </h1>
    <character-frame :selectedItem="selectedItem" />
    <nav-bar @itemSelected="itemSelected($event)" />
    <projects-view v-if="flags['projects-view']" :projects="projects" />
    <experience-view v-if="flags['experience-view']" :projects="experience" />
    `
} //end options

//==== Navigation Bar ==========================================================
const navigationBarComponent = {
  name: "nav-bar",
  props: [""],
  emits: ['itemSelected'],
  data: function () {
    return {
      items: [{title: "Home", link: "#"}, // Here i explain how i am and my story
              {title: "Blog", link: "#"}, // Here i'll post articles on things i like
              {title: "Projects", link: "#"}, // Here the projects i've worked on
              {title: "Experience", link: "#"}, // Here my working experience
              {title: "Hobbies", link: "#"}, // Here my hobbies and activities
              {title: "Contact", link: "#"}, // Here how to contact me
            ],
    }
  },
  methods: {

  },
  template:
    `<div id="nav-bar">
      <ul>
        <li v-for="item in items" @click="$emit('itemSelected', item)">
         {{ item.title }}
        </li>
      </ul>
    </div>`
};

//==== Character Frame =========================================================
const characterFrameComponent = {
  name: "character-frame",
  props: ["selectedItem"],
  emits: ['characterClick'],
  data: function () {
    return {
      character: "",
      source: "assets/Home.gif",
    }
  },
  methods: {

  },
  watch: {

    "selectedItem": function() {
      // selectedItem prop value change, so modify the source of the image.
      this.source = "assets/" + this.selectedItem.title + ".gif"
    }
  },
  template:
    `<div id="character-frame" @click="$emit('characterClick', character)">
      <img :src="source" alt="Choose a character">
    </div>`
}

//==== Projects List View =========================================================
const projectsListViewComponent = {
  name: "projects-view",
  props: ["projects"],
  emits: [],
  data: function () {
    return {

    }
  },
  methods: {

  },
  template:
    `<section id="projects-view" class="spotlights">
        <section v-for="project in projects">
          <img :src="project.img" />
          <div class="content">
            <div class="inner">
              <h2>{{project.title}}</h2>
              <h5>{{project.date}}</h5>
              <p>{{project.description}}</p>
            </div>
          </div>
        </section>
    </section>`
}

//==== Projects List View =========================================================
const experienceListViewComponent = {
  name: "experience-view",
  props: ["experience"],
  emits: [],
  data: function () {
    return {

    }
  },
  methods: {

  },
  template:
    `<section id="experience-view" class="spotlights">
        <section v-for="work in experience">
          <div class="image_container">
          HEY
            <img :src="work.img"/>
          </div>
          <div class="content">
            <div class="inner">
              <h2>{{work.title}}</h2>
              <h5>{{work.date}}</h5>
              <p>{{work.description}}</p>
            </div>
          </div>
        </section>
    </section>`
}

const app = Vue.createApp(rootComponent);
app.component('nav-bar', navigationBarComponent);
app.component('character-frame', characterFrameComponent);
app.component('projects-view', projectsListViewComponent);
app.component('experience-view', projectsListViewComponent);
const vm = app.mount("#app");
