var app = new Vue({
  el: '#app',
  data: {
    header: 'Target Zone Heart Rate Calculator',
    age: '',
    restingHeartRate: '',
    heartRateScale: [],
    percentScale:['50%', '60%', '70%', '80%', '85%', 'Max'],
    maximumHeartRate: '',
    heartRateReserve: ''
  },
  computed: {
    updatedMaxHeartRate: function() {
      //sets a age range restriction to be less than 220
      if (this.age != '' && this.restingHeartRate != '' && this.age <= 115) {
        this.maximumHeartRate = 220 - this.age;
      } else this.maximumHeartRate = '';
      return this.maximumHeartRate
    },
    updatedHeartRateScale: function() {
      //Set new heart rate reserve
      this.heartRateReserve = this.maximumHeartRate - this.restingHeartRate;
      //Empty the array
      this.heartRateScale = [];
      //default scale number for target heart rate zone
      var scaleIncrease = 5;
      var heartRatePercentage = 0;
      if (this.age != '' && this.restingHeartRate != '') {
        //updates heartRateScale array with target heart rates
        for (var i = 0; i < 5; i++) {
          //updates heart rate zones 50% - 80% by 10 percent
          if (i <= 3) {
            heartRatePercentage = ((scaleIncrease * .1) * this.heartRateReserve) + this.restingHeartRate;
            scaleIncrease += 1;
            this.heartRateScale.push(heartRatePercentage);
          } else if (i === 4) { //updates last heart rate zone by 5 percent
            scaleIncrease = 0.85;
            heartRatePercentage = (scaleIncrease * this.heartRateReserve) + this.restingHeartRate;
            this.heartRateScale.push(heartRatePercentage);
          }
        };
      }
      return this.heartRateScale
    }
  }
})
