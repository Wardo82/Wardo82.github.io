//Creating the Vue object.
const rootComponent = {
  data() {
    return {
      pollingId: null,
      selectedItem: {},
      flags: {'home-view': false,
              'projects-view': true,
              'experience-view': false,
            },
      projects:[{title: "Quadruped robot",
                 date: "1 semester project in 2017",
                 description: "Raspberry powered 3D printed quadruped robot"},
               {title: "DVBS2 MATLAB simulation for CubeSat project",
                date: "1 semester project in 2019",
                description: "Matlab simulation of the DVBS2 satellite communication "+
                "standard for the MOVE project and TU Munich."},
                {title: "Rapid prototyping on FPGA of a DVB-S2 CubeSat transmitter",
                 date: "1 semester project in 2020",
                 description: "A prototype of a DVB-S2 transmitter was implemented on Matlab/Simulink with the capacity to be synthesised and its bitstream downloaded onto a Zynq XC7Z020 thanks to the HDL Coder and HDL Verifier add ons. This was successful thanks to the low amount of resources the blocks’ implementation required (less than 10% of the FPGA). These components were verified individually and combined to shape the transmitter which was also shown to use a very small fraction of all the resources present on the Zedboard’s FPGA."},
               ]
    }
  },
  // This method is called when the vue application is mounted into a DOM element.
  mounted: function() {
  },
  // Before unmounting the vue application you can clear the setInterval to stop the polling over the mail list.
  beforeUnmount: function() {
  },

  methods: {
    itemSelected: function (item) {
      console.log("[titleSelected] Selected title is: " + item.title);
      this.selectedItem = item;
    },
  }, //end methods
  template:
    `
    <h1 id="main_title">Eduardo <br> Flores </h1>
    <character-frame :selectedItem="selectedItem" />
    <nav-bar @itemSelected="itemSelected($event)" />
    <card-view v-if="flags['projects-view']" :cards="projects" />
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


//==== Card List View =========================================================
const cardListViewComponent = {
  name: "card-view",
  props: ["cards"],
  emits: [],
  data: function () {
    return {

    }
  },
  methods: {

  },
  template:
    `<div class="cardList" >
      <ul>
        <li v-for="card in cards">
        <h1>{{card.title}}</h1>
        <h5>{{card.date}}</h5>
        <p>{{card.description}}</p>
        </li>
      </ul>
    </div>`
}

const app = Vue.createApp(rootComponent);
app.component('nav-bar', navigationBarComponent);
app.component('character-frame', characterFrameComponent);
app.component('card-view', cardListViewComponent);
const vm = app.mount("#app");
