package com.tetraleague.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tetraleague.util.OTPUtil;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class OTPService {
    private Map<String, String> otpCache = new HashMap<>(); // Temporary storage

    @Autowired
    private JavaSmtpGmailSenderService emailService;

    public void generateAndSendOTP(String email) {
        String otp = OTPUtil.generateOTP();
        otpCache.put(email, otp); // Store OTP for the user's email
        emailService.sendOTPEmail(email, otp);

        // Optionally, you can set a timer to expire the OTP after a few minutes
        new java.util.Timer().schedule(
            new java.util.TimerTask() {
                @Override
                public void run() {
                    otpCache.remove(email);
                }
            },
            TimeUnit.MINUTES.toMillis(5) // OTP expires in 5 minutes
        );
    }

    public boolean validateOTP(String email, String inputOtp) {
        String cachedOtp = otpCache.get(email);
        if (cachedOtp != null && cachedOtp.equals(inputOtp)) {
            otpCache.remove(email); // Clear OTP after successful validation
            return true;
        }
        return false;
    }
}
