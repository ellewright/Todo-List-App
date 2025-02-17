package me.ellewright.todolistapi.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FallbackController {
    @RequestMapping("/{path:^(?!index\\.html$).*}")
    public String redirect() {
        return "forward:/index.html";
    }
}