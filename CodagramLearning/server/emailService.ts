// Simple email logging service (free alternative to SendGrid)
// In production, you would replace this with actual email service

interface EmailData {
  to: string;
  subject: string;
  content: string;
  type: 'contact' | 'enrollment' | 'registration';
}

export class EmailService {
  private static logEmail(emailData: EmailData) {
    const timestamp = new Date().toISOString();
    const emailLog = `
=== EMAIL LOG ===
Timestamp: ${timestamp}
To: ${emailData.to}
Subject: ${emailData.subject}
Type: ${emailData.type}
Content:
${emailData.content}
==================
`;
    
    console.log(emailLog);
    
    // In production, you could:
    // 1. Store emails in database for later processing
    // 2. Use a free email service like EmailJS
    // 3. Integrate with services that have free tiers
    // 4. Use SMTP with services like Gmail
  }

  static async sendContactEmail(contactData: any): Promise<boolean> {
    try {
      const emailContent = `
New Contact Form Submission:

Name: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Phone: ${contactData.phone}
Interested Course: ${contactData.course || 'Not specified'}

Message:
${contactData.message}

---
Submitted at: ${new Date().toLocaleString()}
`;

      this.logEmail({
        to: 'shubhamkasarsrk@gmail.com',
        subject: 'New Contact Form Submission - Codagram',
        content: emailContent,
        type: 'contact'
      });

      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }

  static async sendEnrollmentEmail(userData: any, courseData: any): Promise<boolean> {
    try {
      const emailContent = `
New Course Enrollment:

User Details:
Name: ${userData.firstName} ${userData.lastName}
Email: ${userData.email}
Phone: ${userData.phone || 'Not provided'}

Course Details:
Course: ${courseData.title}
Category: ${courseData.category}
Price: ₹${courseData.price}
Duration: ${courseData.duration}

---
Enrolled at: ${new Date().toLocaleString()}
`;

      this.logEmail({
        to: 'shubhamkasarsrk@gmail.com',
        subject: `New Enrollment: ${courseData.title} - Codagram`,
        content: emailContent,
        type: 'enrollment'
      });

      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }

  static async sendRegistrationEmail(userData: any): Promise<boolean> {
    try {
      const emailContent = `
New User Registration:

User Details:
Name: ${userData.firstName} ${userData.lastName}
Email: ${userData.email}
User ID: ${userData.id}

---
Registered at: ${new Date().toLocaleString()}
`;

      this.logEmail({
        to: 'shubhamkasarsrk@gmail.com',
        subject: 'New User Registration - Codagram',
        content: emailContent,
        type: 'registration'
      });

      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }
}