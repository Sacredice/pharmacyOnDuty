
export const nextShiftTimestamp = () => {
    const nowDatetime = new Date();
    // console.log(nowDatetime.getTime(), nowDatetime.toLocaleString());
    // console.log(nowDatetime.toISOString().split("T")[1].split(".")[0]);
    const datetimeArray = nowDatetime.toISOString().split("T")[1].split(".")[0];
    // console.log("Yarın", nowDatetime.toLocaleString());
    const hourNow = Number(datetimeArray.split(":")[0]);
    const minNow = Number(datetimeArray.split(":")[1]);

    if ((hourNow < 5) || (hourNow === 5 && minNow < 30)) {
        const minDiff = 30 < minNow ? 90 - minNow : 30 - minNow;
        const hourDiff = 30 < minNow ? 4 - hourNow : 5 - hourNow;
        const nextShift = (nowDatetime.getTime() + (hourDiff * 60 * 60 * 1000) + (minDiff * 60 * 1000) - (119 * 1000));
        console.log("Today's shift change not happened yet(before 8:30 TR timezone)", nextShift);
        return nextShift;
    } else {
        const minDiff = minNow < 30 ? minNow - 30 + 60 : minNow - 30;
        const hourDiff = minNow < 30 ? hourNow - 6 : hourNow - 5;
        nowDatetime.setDate(nowDatetime.getDate() + 1)
        const nextShift = (nowDatetime.getTime() - (hourDiff * 60 * 60 * 1000) - (minDiff * 60 * 1000) - (119 * 1000));
        console.log("Today's shift has changed next one is tomorrow at 8:30", nextShift);
        return nextShift;
    }
}

export function dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export const getThreeClosest = (userLocation, data) => {
    if (!userLocation) {
        console.log("data");
        return data;
    } else {
        const distancePropertyAdded = data.map(pharmacyObj => {
            const location = pharmacyObj.loc.split(",");
            pharmacyObj.distance = ((Number(location[0]) - userLocation.lat) ** 2) 
                + ((Number(location[1]) - userLocation.lon) ** 2);
            return pharmacyObj;
        });

        distancePropertyAdded.sort(dynamicSort("distance"));;
        return distancePropertyAdded.slice(0, 3);

    }
    
};


