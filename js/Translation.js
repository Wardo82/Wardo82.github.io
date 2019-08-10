function Translation() {
    //Default Settings
    var Cx = 0;
    var Cy = 0;
    var Px = 0;
    var Py = 0;
    var Diffx = 0;
    var Diffy = 0;
    var Hyp = 0;
    var alpha = 0;

};

//Computes the Orientation of an QR-Code in an image frame
//@param: qrObj is an jsQR Return-Object holding the edge positions
//Returns the angle of rotation in degree
Translation.prototype.getOrientation = function (qrObj) {
    try {
        //Get the X and Y coordinates of the given Object
        this.Cx = (qrObj.location['topRightCorner']['x'] + qrObj.location['topLeftCorner']['x'] + qrObj.location['bottomRightCorner']['x'] + qrObj.location['bottomLeftCorner']['x']) / 4.0;
        this.Cy = -(qrObj.location['topRightCorner']['y'] + qrObj.location['topLeftCorner']['y'] + qrObj.location['bottomRightCorner']['y'] + qrObj.location['bottomLeftCorner']['y']) / 4.0;
        this.Px = (qrObj.location['topRightCorner']['x'] + qrObj.location['topLeftCorner']['x']) / 2.0;
        this.Py = -(qrObj.location['topRightCorner']['y'] + qrObj.location['topLeftCorner']['y']) / 2.0;
        //Get X and Y Difference between top and middle
        this.Diffx = this.Px - this.Cx;
        this.Diffy = this.Py - this.Cy;
        this.Hyp = Math.sqrt((this.Diffx * this.Diffx + this.Diffy * this.Diffy)); // Hypotenuse with Pythagorean theorem
        this.alpha = Math.asin(this.Diffy / this.Hyp)*360/(2*Math.PI); //Compute angle in degree w.r.t the horizontal axis

        //Adjustemnt of angle to support all quadrants of the unit circle
        if (this.Diffx > 0 && this.Diffy > 0) { //First Quadrant: x > 0 and y > 0
          // Do nothing
        } else if( this.Diffx < 0 && this.Diffy > 0){ //Second Quadrant: x < 0 and y > 0
          this.alpha = 180 - this.alpha; // 180 degrees minus the angle w.r.t the left horizontal axis
        } else if( this.Diffx < 0 && this.Diffy < 0){ // Third quadrant: x < 0 and y < 0
           /* alpha is the degree of a vector between (-1, 0) and (0,-1). That means that the vector (-1,-1) has
           a degree of -45. We substract 180 and multiply by -1 to get 225 degrees w.r.t to (1, 0) */
          this.alpha = -(-180 + this.alpha);
        } else if( this.Diffx > 0 && this.Diffy < 0) { // Fourth quadrant: x > 0 and y < 0
          this.alpha = 360 + this.alpha; // 360 degrees minus (the value of alpha is negative) the angle 
        }

    }
    catch (error) {
        alert(error.message)
    }
    return this.alpha;
};

//Computes the radian of an angle given in degree
//@param: angle in degree
Translation.prototype.toRadian = function (angle) {
    return angle * (Math.PI / 180.0);
};
