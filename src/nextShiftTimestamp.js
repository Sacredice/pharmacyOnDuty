export const nextShiftTimestamp = () => {
    const nowDatetime = new Date();
    console.log(nowDatetime.getTime(), nowDatetime.toLocaleString());
    const datetimeArray = nowDatetime.toLocaleString().split(" ");
    console.log("Yarın", nowDatetime.toLocaleString());
    const hourNow = Number(datetimeArray[1].split(":")[0]);
    const minNow = Number(datetimeArray[1].split(":")[1]);

    if ((hourNow < 8) || (hourNow === 8 && minNow < 30)) {
        const minDiff = 30 < minNow ? 90 - minNow : 30 - minNow;
        const hourDiff = 30 < minNow ? 7 - hourNow : 8 - hourNow;
        const nextShift = (nowDatetime.getTime() + (hourDiff * 60 * 60 * 1000) + (minDiff * 60 * 1000) - (119 * 1000));
        console.log("Bugün shift change: saat 8:30 a geliyor", nextShift);
        return nextShift;
    } else {
        const minDiff = minNow < 30 ? minNow - 30 + 60 : minNow - 30;
        const hourDiff = minNow < 30 ? hourNow - 9 : hourNow - 8;
        nowDatetime.setDate(nowDatetime.getDate() + 1)
        const nextShift = (nowDatetime.getTime() - (hourDiff * 60 * 60 * 1000) - (minDiff * 60 * 1000) - (119 * 1000));
        console.log("Yarın shift change: saat 8:30 u geçmiş", nextShift);
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
