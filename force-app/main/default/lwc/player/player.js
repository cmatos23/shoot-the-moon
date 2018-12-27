import { LightningElement, api} from 'lwc';

export default class player extends LightningElement {
    @api player;

   @api score = 0;

    handleUpClick(){ 
        this.player.Score__c++;
    }
    handleDownClick(){
        this.player.Score__c--;
    }
}