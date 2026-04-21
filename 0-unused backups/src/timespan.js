class TimeSpan {
   constructor () {
      this.end = new Date();
      this.start = new Date(this.end.getFullYear(), 0, 1);
   }
}

export default TimeSpan;