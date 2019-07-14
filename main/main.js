'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
//decodeBarcodes将输入的数组去重并统计个数
const decodeBarcodes= barcodes =>{
    const idAndCountMap = new Map();
	const barcodesAndCounts=new Array();
	
	for(const barcode of barcodes){
		if(barcode.indexOf('-')===-1){
            idAndCountMap.set(barcode,idAndCountMap.get(barcode)+1||1);
		}else{
            console.log(idAndCountMap.get(barcode.split('-')[0]));
            idAndCountMap.set(barcode.split('-')[0],idAndCountMap.get(barcode.split('-')[0])+
            parseFloat(barcode.split('-')[1])||parseFloat(barcode.split('-')[1]));
		}
	}		 
	for(const idAndCount of idAndCountMap){
        const order={};
        order.id=idAndCount[0];
        order.count=idAndCount[1];
        barcodesAndCounts.push(order);
	}
	return barcodesAndCounts;
}
//getItems 获取所有的小计商品列表
const getItems = barcodesAndCounts =>{
    const items = loadAllItems();
    const orders= new Array();
    
    for(const barcodesAndCount of barcodesAndCounts){
    	
        for(const item of items){
        	if(barcodesAndCount.id===item.barcode){
        		const order={};
	        	order.id = item.barcode;
	        	order.name = item.name;
	        	order.unit = item.unit;
	        	order.price = item.price;
	        	order.count = barcodesAndCount.count;
	        	orders.push(order);
	        }
        }
    }
    return orders;
}
//loadAllPromotion加载所有的优惠
const loadAllPromotion=()=>{
    const saveList = new Array();
    const promotions = loadPromotions();
    for(const promotion of promotions){
    	if(promotion.type==='BUY_TWO_GET_ONE_FREE'){
    		for (const save of promotion.barcodes){
    			saveList.push(save);
    		}
    	}
    }
    return saveList;
}
//calculateReceipt 选择优惠计算总价和节省
const calculateReceipt = orders =>{
    const promotions = loadPromotions();
    const saveList = new Array();
    const ordersAndSaving= {};
    const ordersASaving= [];
    let allTotal=0;
    let saving=0;
    let actualTotal=0;
    for(const promotion of promotions){
    	if(promotion.type==='BUY_TWO_GET_ONE_FREE'){
    		for (const save of promotion.barcodes){
    			saveList.push(save);
    		}
    	}
    }
    for (const order of orders){
    	actualTotal+=order.price*order.count;
    	const orderAndSaving ={};
        const freeCount = Math.floor(order.count / 3);
    	orderAndSaving.name=order.name;
        orderAndSaving.count=order.count;
        orderAndSaving.unit=order.unit;
    	orderAndSaving.price=order.price;
    	if(saveList.indexOf(order.id)>-1){
    		orderAndSaving.total=order.price*(order.count-freeCount);
   	 	}else{
   	 		orderAndSaving.total=order.price*order.count;
   	 	}
   	 	allTotal+=orderAndSaving.total;
    	ordersASaving.push(orderAndSaving);
    }
    ordersAndSaving.ordersASaving=ordersASaving;
    ordersAndSaving.allTotal=allTotal;
    ordersAndSaving.saving=actualTotal-allTotal;
    return ordersAndSaving;
}

