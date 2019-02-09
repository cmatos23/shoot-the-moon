import { LightningElement, api, track} from 'lwc';

export default class player extends LightningElement {
    @api player;

    handleUpClick(){
        this.dispatchEvent(new CustomEvent('scoreup', {detail : this.player.Id}));
    }
    handleDownClick(){
        this.dispatchEvent(new CustomEvent('scoredown', {detail : this.player.Id}));
    }
}