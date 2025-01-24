export default class APIServices {
    //Get Partner Info
    async getPartnerInfoData() {
        const response = await fetch(`/api/partner/info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        return result;
    }

    //Create Partner
    async createPartnerInfoData() {
        const response = await fetch(`/api/partner/create`, {
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
        const response = await fetch(`/api/partner/update`, {
            method: 'PUT',
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
        const response = await fetch(`/api/language/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        const result = await response.json();
        return result;  
    }
    async setupGuide(reqBody) {
        const response = await fetch(`/api/dashboard/setup-guide`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        const result = await response.json();
        return result; 
    }


}