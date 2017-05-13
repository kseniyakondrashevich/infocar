/**
 * Created by User on 04.05.2017.
 */

define(function () {
   class Observable{
       constructor(){
           this.subscribers = [];
       }

       subscribe(publisher){
           //Проверка на существование подписчика
           publisher.subscribers.push(this);
           return this;
       }

       unsubscribe(publisher){
           for(let i=0; i<this.subscribers.length; i++){
               if(this.subscribers[i] === publisher){
                   this.subscribers.splice(i, 1);
                   return;
               }
           }
       }

       publish(data){
           this.subscribers.forEach(function (subscriber) {
               subscriber(data);
           });
           return this;
       }
   }
});