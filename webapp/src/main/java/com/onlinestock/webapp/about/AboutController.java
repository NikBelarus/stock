package com.onlinestock.webapp.about;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.BuildProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api")
public class AboutController {

    @Autowired
    BuildProperties buildProperties;

    @GetMapping("about")
    public @ResponseBody AboutAppInfo list(){
        AboutAppInfo info = new AboutAppInfo();
        info.name = buildProperties.getName();

        info.version = buildProperties.getVersion();
        info.groupName = buildProperties.getGroup();

        log.info("App info " + info + " returned");
        return info;
    }
}

