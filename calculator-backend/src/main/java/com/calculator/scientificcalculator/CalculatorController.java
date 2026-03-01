package com.calculator.scientificcalculator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "*")
public class CalculatorController {

    private static final Logger logger = LoggerFactory.getLogger(CalculatorController.class);

    @GetMapping("/sqrt")
    public double getSqrt(@RequestParam double x) {
        logger.info("Request: Square root of {}", x);
        double result = Math.sqrt(x);
        logger.info("Response: result = {}", result);
        return result;
    }

    @GetMapping("/factorial")
    public long getFactorial(@RequestParam int x) {
        logger.info("Request: Factorial of {}", x);
        long result = 1;
        for (int i = 1; i <= x; i++) {
            result *= i;
        }
        logger.info("Response: result = {}", result);
        return result;
    }

    @GetMapping("/ln")
    public double getLn(@RequestParam double x) {
        logger.info("Request: Natural log of {}", x);
        double result = Math.log(x);
        logger.info("Response: result = {}", result);
        return result;
    }

    @GetMapping("/power")
    public double getPower(@RequestParam double x, @RequestParam double b) {
        logger.info("Request: {} raised to {}", x, b);
        double result = Math.pow(x, b);
        logger.info("Response: result = {}", result);
        return result;
    }
}
