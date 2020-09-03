package com.team5.expoapi.controller;

import com.team5.expoapi.exceptions.PathNotFoundException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@Controller
public class CustomErrorController implements ErrorController {

  @GetMapping("/error")
  public void handleError() {
    throw new PathNotFoundException();
  }

  @Override
  public String getErrorPath() {
    return "/error";
  }
}
