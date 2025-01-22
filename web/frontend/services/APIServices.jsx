export default class APIServices {
     baseUrl='https://1f81-137-97-249-58.ngrok-free.app/external';
    //Get Partner Info
    async getPartnerInfoData() {
        const response = await fetch(`${this.baseUrl}/api/partner/info?shop=quickstart-1add1160.myshopify.com`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        return result;
    }

    //Create Partner
    async createPartnerInfoData() {
        const response = await fetch(`${this.baseUrl}/api/partner/create?shop=quickstart-1add1160.myshopify.com`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        return result;
    }

    //Partner language update
    async languageUpdate(data) {
        const response = await fetch(`${this.baseUrl}/api/partner/update?shop=quickstart-1add1160.myshopify.com`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;        
    }

    //Get language list
    async languageList(reqBody) {
        const response = await fetch(`${this.baseUrl}/api/language/list?shop=quickstart-1add1160.myshopify.com`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        const result = await response.json();
        return result;  
    }

    //Cancel active plan

}