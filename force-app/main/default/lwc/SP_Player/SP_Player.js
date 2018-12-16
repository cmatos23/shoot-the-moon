import { LightningElement, api } from 'lwc';

export default class SP_Player extends LightningElement {
    @api
    score = 0;

    handleUpClick(){
        this.score++;
    }
    handleDownClick(){
        this.score--;
    }
}