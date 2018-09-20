<template>
  
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div id="vuechart-example">
      <apexcharts width="500" type="bar" :options="options" :series="series"></apexcharts>
      <apexcharts width="500" type="line" :options="options" :series="series"></apexcharts>
      <div>
        <button @click="updateChart">Update Data</button>
      </div>

      <div id="wrapper">

		<div class="content-area">
			<div class="container-fluid">
				<div class="main">

					<div class="row sparkboxes mt-4">
						<div class="col-md-3">
							<div class="box box1">
								<div class="details">
										<h3>1213</h3>
										<h4>CLICKS</h4>
								</div>
								<div id="spark1"></div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="box box2">
									<div class="details">
										<h3>422</h3>
										<h4>VIEWS</h4>
									</div>
								<div id="spark2"></div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="box box3">
									<div class="details">
										<h3>311</h3>
										<h4>LEADS</h4>
									</div>
								<div id="spark3"></div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="box box4">
								<div class="details">
									<h3>22</h3>
									<h4>SALES</h4>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>
	</div>

    </div>
  </div>	
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import VueApexCharts from 'vue-apexcharts'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  components: {
    HelloWorld,
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      timer: '',
      options: {
        chart: {
          id: 'vuechart-example'
        },
        stroke: {
            show: true,
            curve: 'smooth',
            width: 1,
        },
        xaxis: {
          labels: {
            show: true,
             style: {
               colors: ['#00E396', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
               fontSize: '12px',
               cssClass: 'apexcharts-xaxis-label',
              },
          },
        },
      },
      series: [{
        name: 'cc',
        data: [[1, 34], [3.8, 43], [5, 31] , [10, 43], [13, 33], [15, 43], [18, 33] , [20, 52]]
      },{
        name: 'ul',
        data: [[1, 34], [3.8, 43], [5, 31] , [10, 43], [13, 33], [15, 43], [18, 33] , [20, 52]]
      }]
    }
  },
  created: function() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 10000)
  },
  methods: {
    fetchData: function() {
      console.log("fetch data...");
      this.updateChart();
    },
    updateChart() {
      const max = 90; 
      const min = 20; 
      // const newData = this.series[0].data.map(() => {
      //   return Math.floor(Math.random() * (max - min + 1)) + min
      // })
      //this.series = [{ data : newData }]
      this.$http.get('http://35.229.162.134:8000/sfrlog/_doc/1')
      .then(response => {
        console.log(response.data["_source"]["CC"]);
        console.log(response.data["_source"]["UL"]);
        var cc_data = response.data["_source"]["CC"];
        var ul_data = response.data["_source"]["UL"];
        const data_array = [];
        for (var i in cc_data) {
          var px = cc_data[i]["px"]; var pz = cc_data[i]["pz"]*1000; var sfr = cc_data[i]["sfr"];
          var pair = [pz, sfr];
          data_array.push(pair);
        }

        const ul_data_array = [];
        for (var i in ul_data) {
          var px = ul_data[i]["px"]; var pz = ul_data[i]["pz"]*1000; var sfr = ul_data[i]["sfr"];
          var pair = [pz, sfr];
          ul_data_array.push(pair);
        }

        this.series = [{data : data_array}, {data : ul_data_array}];
      });
    }, 
    cancelAutoUpdate: function() { clearInterval(this.timer) }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  /*background: #343E59;*/
  color: #777;
  font-family: Montserrat, Arial, sans-serif;
}

.body-bg {
  background: #F3F4FA !important;
}

h1, h2, h3, h4, h5, h6, strong {
  font-weight: 600;
}

body {
  /*background: linear-gradient(45deg,#3a3a60,#5f5f8e);
  min-height: 100vh;*/
}

.content-area {
  max-width: 1280px;
  margin: 0 auto;
}

.box {
  background-color: #2B2D3E;
  padding: 25px 20px;  
}

.shadow {
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
}
.sparkboxes .box {
  padding-top: 10px;
  padding-bottom: 10px;
  text-shadow: 0 1px 1px 1px #666;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
  position: relative;
  border-radius: 5px;
}

.sparkboxes .box .details {
  position: absolute;
  color: #fff;
  transform: scale(0.7) translate(-22px, 20px);
}
.sparkboxes strong {
  position: relative;
  z-index: 3;
  top: -8px;
  color: #fff;
}


.sparkboxes .box1 {
  background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
  height: 100px;
}

.sparkboxes .box2 {
  background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);
  height: 100px;
}

.sparkboxes .box3 {
  background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);
  height: 100px;
}

.sparkboxes .box4 {
  background-image: linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%);
  height: 100px;
}

</style>
