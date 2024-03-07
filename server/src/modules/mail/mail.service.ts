import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import * as ejs from 'ejs';
import * as path from 'path';
dotenv.config();
@Injectable()
export class MailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        host: 'smtp.gmail.com',
        port: 587, // Thay đổi nếu cần thiết
        secure: false,
        auth: {
          user: process.env.NAME_MAIL,
          pass: process.env.PASS_WORD_EMAIL,
        },
      }),
    );
  }

  async sendMail(
    to: string,
    subject: string,
    templatePath: string,
    data: Record<string, any>,
  ) {
    const ejsTemplate = readFileSync(templatePath, 'utf-8');
    const htmlContent = ejs.render(ejsTemplate, data, {
      filename: path.resolve(templatePath),
    });
    const mailOptions = {
      from: process.env.NAME_MAIL,
      to: to,
      subject: subject || 'INTERCONTINENTAL HELLO', // Thay đổi nếu cần thiết
      html: htmlContent,
    };

    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
