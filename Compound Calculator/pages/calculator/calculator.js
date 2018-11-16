// pages/calculator/calculator.js
const app = getApp()
var result = '';
var labels = ['Principal:', 'Interest:', 'Compound:', 'Duration:', 'Addition:', 'Calculate', 'Reset', 'Compound Calculator', 'Option: '];
var labelsCH = ['本金:', '利率:', '複利:', '年限:', '增加金:', '計算', '取消', '複利計算機', '選項：'];
var compoundArray = ['Monthly', 'Annually'];
var additionArray = ['Monthly', 'Annually'];
var compoundArrayCH = ['每月', '每年'];
var additionArrayCH = ['每月', '每年'];

Page({
  data: {
    label: labels,
    compoundArray: compoundArray,
    additionArray: additionArray,
    text: result,
    principal: 0,
    interest: 0,
    compound: 12,
    duration: 0,
    additionPayment: 0,
    additionTime: 1,
    compoundIdx: 0,
    additionIdx: 0,
    objectCompoundArray: [
      {
        id: 0,
        name: 'Monthly',
        value: 12
      },
      {
        id: 1,
        name: 'Annually',
        value: 1
      }
    ],
    objectAdditionArray: [
      {
        id: 0,
        name: 'Monthly',
        value: 1
      },
      {
        id: 2,
        name: 'Annually',
        value: 12
      }
    ]
  },

  bindTextChange: function (e) {
    var item = e.target.id
    var value = Number(e.detail.value)
    if (item == "principal") {
      this.setData({
        principal: value
      })
    } else if (item == "interest") {
      this.setData({
        interest: value
      })
    } else if (item == "duration") {
      this.setData({
        duration: value
      })
    } else {
      this.setData({
        additionPayment: value
      })
    }
  },

  bindPickerChange: function (e) {
    var idx = e.detail.value
    if (e.target.id == "compoundPicker") {
      this.setData({
        compoundIdx: idx,
        compound: this.data.objectCompoundArray[idx].value
      })
    } else {
      this.setData({
        additionIdx: idx,
        additionTime: this.data.objectAdditionArray[idx].value
      })
    }
  },

  futureValueCalculations: function (e) {
    var P = this.data.principal;
    var r = this.data.interest;
    var n = this.data.compound;
    var rn = Number(r / n);
    var t = this.data.duration;
    var PMT = this.data.additionPayment / this.data.additionTime;
    var TD = (PMT * t * 12 + P).toFixed(2);
    var FV = ((P * Math.pow((1 + rn), (n * t))) + (PMT * ((Math.pow((1 + rn), (n * t)) - 1) / (r / n)))).toFixed(2);
    var IE = (FV - TD).toFixed(2);
    this.setData({
      text: '\nResults: \nFuture Value: $' + FV + '\nTotal Deposit: $' + TD + '\nInterest Earned: $' + IE
    })
  },

  langChange: function (e) {
    if (this.data.label[0] === labels[0]) {
      this.setData({
        label: labelsCH,
        additionArray: additionArrayCH,
        compoundArray: compoundArrayCH
      })
    } else {
      this.setData({
        label: labels,
        additionArray: additionArray,
        compoundArray: compoundArray
      })
    }
  },

  resetBug: function (e) {
    this.setData({
      compoundIdx: 0,
      additionIdx: 0,
      text: result
    })
  }
})
