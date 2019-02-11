import { LightningElement, api, track} from 'lwc';

export default class player extends LightningElement {
    @api player;
    @track isClean = true;
    get scoreClass(){
        return 'slds-m-horizontal_small ' + (!this.isClean ? 'changed' : '');
    }
    handleUpClick(){
        this.isClean = false;
        this.dispatchEvent(new CustomEvent('scoreup', {detail : this.player.Id}));
    }
    handleDownClick(){
        this.isClean = false;
        this.dispatchEvent(new CustomEvent('scoredown', {detail : this.player.Id}));
    }
    @api
    clean(){
        this.isClean = true;
    }
}