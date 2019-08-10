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
        this.Cy = (qrObj.location['topRightCorner']['y'] + qrObj.location['topLeftCorner']['y'] + qrObj.location['bottomRightCorner']['y'] + qrObj.location['bottomLeftCorner']['y']) / 4.0;
        this.Px = (qrObj.location['topRightCorner']['x'] + qrObj.location['topLeftCorner']['x']) / 2.0;
        this.Py = (qrObj.location['topRightCorner']['y'] + qrObj.location['topLeftCorner']['y']) / 2.0;
        //Get X and Y Difference between top and middle
        this.Diffx = this.Cx - this.Px;
        this.Diffy = this.Cy - this.Py;
        this.Hyp = Math.sqrt((this.Diffx * this.Diffx + this.Diffy * this.Diffy));
        //Calculate Angle in Degree
        this.alpha = Math.asin(this.Diffy / this.Hyp)*360/(2*Math.PI);

        //Adjustemnt of angle to support all quadrants of the unit circle
        //Adjustment is based on the postion of the TopLeftCorner
        //Third Quadrant
        // if ((qrObj.location['topLeftCorner']['x'] <= this.Cx) && (qrObj.location['topLeftCorner']['y'] >= this.Cy)) {
        //     this.alpha += 180.0;
        // }
        // //Fourth Quadrant
        // else if ((qrObj.location['topLeftCorner']['x'] >= this.Cx) && (qrObj.location['topLeftCorner']['y'] >= this.Cy)) {
        //     this.alpha += 270.0;
        // }
        // //First Quadrant
        // else if ((qrObj.location['topLeftCorner']['x'] >= this.Cx) && (qrObj.location['topLeftCorner']['y'] <= this.Cy)) {
        //     this.alpha += 0.0;
        // }
        // //Second Quadrant
        // else if ((qrObj.location['topLeftCorner']['x'] <= this.Cx) && (qrObj.location['topLeftCorner']['y'] <= this.Cy)) {
        //     //Nothing
        //     this.alpha += 0.0;
        // }
    }
    catch (error) {
        alert(error.message)
    }
    return this.alpha; //(this.alpha - 90.0) % 360;
};

//Computes the radian of an angle given in degree
//@param: angle in degree
Translation.prototype.toRadian = function (angle) {
    return angle * (Math.PI / 180.0);
};
