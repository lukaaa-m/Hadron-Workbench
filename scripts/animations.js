function cubicAnim(min, max, duration, objRef, func){
    //Generate one value for each frame throughout the duration
    //Therefore get value for each increment of duration / framerate
    increment = duration / getFrameRate();

    diff = max - min;

    xValues = [];

    newVal = min.valueOf();
    while(newVal + increment < max){
        xValues.push(newVal + increment);
        newVal = newVal + increment;
    }

    if(diff % increment != 0){
        xValues.push(max);
    }

    animValues = [];
    xValues.forEach(x =>{
        animValues.push(x^3);
    });

}