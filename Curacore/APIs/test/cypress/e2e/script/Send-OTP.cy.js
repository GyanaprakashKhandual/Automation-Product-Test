describe('Send OTP API Tests', () => {
  const baseUrl = 'http://localhost:5000/api/v1/auth/send-otp';
  
  // Positive Test Cases
  describe('Positive Test Cases', () => {
    it('should send OTP successfully for valid email', () => {
      cy.request('POST', baseUrl, {
        email: 'gyan@avidusinteractive.com'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'OTP sent successfully');
      });
    });

    it('should accept email with valid special characters', () => {
      cy.request('POST', baseUrl, {
        email: 'test.user+tag@example.com'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'OTP sent successfully');
      });
    });

    it('should accept email with different TLDs', () => {
      cy.request('POST', baseUrl, {
        email: 'test@example.co.uk'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'OTP sent successfully');
      });
    });
  });

  // Negative Test Cases
  describe('Negative Test Cases', () => {
    it('should return error for missing email', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: {},
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });

    it('should return error for invalid email format', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: {
          email: 'invalid-email'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });

    it('should return error for empty email string', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: {
          email: ''
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should handle very long email addresses', () => {
      const longEmail = 'a'.repeat(64) + '@' + 'b'.repeat(185) + '.com';
      
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: {
          email: longEmail
        },
        failOnStatusCode: false
      }).then((response) => {
        // Should either succeed or fail gracefully
        expect([200, 400]).to.include(response.status);
      });
    });

    it('should handle email with uppercase characters', () => {
      cy.request('POST', baseUrl, {
        email: 'TEST.User@Example.COM'
      }).then((response) => {
        expect([200, 400]).to.include(response.status);
      });
    });
  });

  // Security Tests
  describe('Security Tests', () => {
    it('should handle potential SQL injection attempts safely', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: {
          email: "test'; DROP TABLE users; --"
        },
        failOnStatusCode: false
      }).then((response) => {
        // Should either reject as invalid email or handle safely
        expect([200, 400]).to.include(response.status);
      });
    });

    it('should handle XSS attempts safely', () => {
      cy.request({
        method: 'POST',
        url: baseUrl,
        body: {
          email: '<script>alert("xss")</script>@example.com'
        },
        failOnStatusCode: false
      }).then((response) => {
        // Should either reject as invalid email or handle safely
        expect([200, 400]).to.include(response.status);
      });
    });
  });
});