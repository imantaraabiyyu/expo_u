
INSERT INTO `user` (`id`, `created_date`, `modified_date`, `activated`, `email`,`login_method`, `password`, `username`) VALUES (1,NULL,NULL,true,'user@expou.com',0,'{bcrypt}$2y$12$L1EFU8zlCXOj1/8pg2u12eQYPqlcA640tAUCBNpbxSrM7DGVB0PVq','audience');
INSERT INTO `user` (`id`, `created_date`, `modified_date`, `activated`, `email`,`login_method`, `password`, `username`) VALUES (2,NULL,NULL,true,'admin@expou.com',0,'{bcrypt}$2y$12$AcwuLj2razp95IiKWtDgd.HNJbifrCajv9sevAv9cQvIhltYla2BW','admin');
INSERT INTO `user` (`id`, `created_date`, `modified_date`, `activated`, `email`,`login_method`, `password`, `username`) VALUES (3,NULL,NULL,true,'merchant@expou.com',0,'{bcrypt}$2y$12$rzVI46nI72idmlSR.Ps14et2oNu0vM2M2v8lR/DC8p4PL7OQcuTLu','merchant');
INSERT INTO `user` (`id`, `created_date`, `modified_date`, `activated`, `email`,`login_method`, `password`, `username`) VALUES (4,NULL,NULL,true,'eo@expou.com',0,'{bcrypt}$2y$12$3YB6iB5xR6d/JzSlw5RVC.QzBQ6m8MqM5evu5N1ODXldft.KjpsVC','eventorganizer');
INSERT INTO `user` (`id`, `created_date`, `modified_date`, `activated`, `email`,`login_method`, `password`, `username`) VALUES (5,NULL,NULL,true,'merchant1@expou.com',0,'{bcrypt}$2y$12$8vTN660BVXWHtmekSLkRy.PHfF/gJCD6MmP081tDejY9yYJARRK6K','Merchant Test Number 1');

INSERT INTO `role` (`id`, `created_date`, `modified_date`, `name`) VALUES (1,NULL,NULL,'Admin');
INSERT INTO `role` (`id`, `created_date`, `modified_date`, `name`) VALUES (2,NULL,NULL,'Audience');
INSERT INTO `role` (`id`, `created_date`, `modified_date`, `name`) VALUES (3,NULL,NULL,'Merchant');
INSERT INTO `role` (`id`, `created_date`, `modified_date`, `name`) VALUES (4,NULL,NULL,'EventOrganizer');

INSERT INTO `admin` (`id`, `created_date`, `modified_date`, `age`, `gender`, `phone`) VALUES (1,NULL,NULL,30,1,'087895468745');


INSERT INTO `audience` (`id`, `created_date`, `modified_date`, `age`, `gender`, `phone`) VALUES (1,NULL,NULL,30,1,'087895468745');
INSERT INTO `audience` (`id`, `created_date`, `modified_date`, `age`, `gender`, `phone`) VALUES (2,NULL,NULL,17,0,'085478962135');
INSERT INTO `audience` (`id`, `created_date`, `modified_date`, `age`, `gender`, `phone`) VALUES (3,NULL,NULL,20,1,'0894235687456');

INSERT INTO `event_organizer` (`id`, `created_date`, `modified_date`, `address`, `city`, `description`, `name`, `npwp_number`, `phone`, `siup_number`, `status`) VALUES (1,NULL,NULL,'Jl. Waru Kencana No.15','Jakarta','Perusahaan yang bergerak di bidang penyelengaraan event','PT. Karya Semoga Saja Abadi','01.234.567.8-901.234','084568745987','012/3456/789.01/2020',0);
INSERT INTO `event_organizer` (`id`, `created_date`, `modified_date`, `address`, `city`, `description`, `name`, `npwp_number`, `phone`, `siup_number`, `status`) VALUES (2,NULL,NULL,'Jl.Beringin No.770','Jakarta Barat','Perusahaan yang bergerak di bidang penyelengara edukasi','PT. Pintar Cerdas Selalu','01.234.567.8-901.234','085698742135','012/3456/789.01/2020',2);


INSERT INTO `category` (`id`, `created_date`, `modified_date`, `name`) VALUES (1,NULL,NULL,'Music');
INSERT INTO `category` (`id`, `created_date`, `modified_date`, `name`) VALUES (2,NULL,NULL,'Workshop');
INSERT INTO `category` (`id`, `created_date`, `modified_date`, `name`) VALUES (3,NULL,NULL,'Education');
INSERT INTO `category` (`id`, `created_date`, `modified_date`, `name`) VALUES (4,NULL,NULL,'Exhibitation');

INSERT INTO `credit` (`id`, `created_date`, `modified_date`, `amount`) VALUES (1,NULL,NULL,2000000);
INSERT INTO `credit` (`id`, `created_date`, `modified_date`, `amount`) VALUES (2,NULL,NULL,5000000);
INSERT INTO `credit` (`id`, `created_date`, `modified_date`, `amount`) VALUES (3,NULL,NULL,8000000);

INSERT INTO `location` (`id`, `created_date`, `modified_date`, `latitude`, `longitude`, `name`) VALUES (1, NULL, NULL, '-6.2139028', '106.8062094', 'JCC Senayan');
INSERT INTO `location` (`id`, `created_date`, `modified_date`, `latitude`, `longitude`, `name`) VALUES (2, NULL, NULL, '-6.2242119', '106.8036165', 'Gelora Bung Karno');

INSERT INTO `event` (`id`, `created_date`, `modified_date`, `capacity`, `description`, `end_date`, `event_tier`,  `name`, `start_date`, `event_status`, `start_time`,`end_time`) VALUES (1,NULL,NULL,50,'Konser Amal','2020-04-27',1,'Konser Amal','2020-04-27',1,'16:30:00','20:30:00');
INSERT INTO `event` (`id`, `created_date`, `modified_date`, `capacity`, `description`, `end_date`, `event_tier`,  `name`, `start_date`, `event_status`, `start_time`,`end_time`) VALUES (2,NULL,NULL,30,'Workshop database oracle','2020-05-09',0,'Workshop Hebat','2020-05-06',0,'09:00:00','16:30:00');
INSERT INTO `event` (`id`, `created_date`, `modified_date`, `capacity`, `description`, `end_date`, `event_tier`,  `name`, `start_date`, `event_status`, `start_time`,`end_time`) VALUES (3,NULL,NULL,100,'Pecinta Budaya Jepang dan animo','2020-05-29',2,'Exhibition Jejepangan','2020-05-27',0,'12:30:00','17:30:00');


INSERT INTO `pricing` (`id`, `created_date`, `modified_date`, `name`, `price`,`codename`, `stock`,`description`) VALUES (1,NULL,NULL,'Tribune',150000,'TRB',30,'Tempat duduk di depan, berdiri');
INSERT INTO `pricing` (`id`, `created_date`, `modified_date`, `name`, `price`,`codename`, `stock`,`description`) VALUES (2,NULL,NULL,'Bronze',20000,'BRZ',10,'Tempat duduk di sayap kanan');
INSERT INTO `pricing` (`id`, `created_date`, `modified_date`, `name`, `price`,`codename`, `stock`,`description`) VALUES (3,NULL,NULL,'Silver',300000,'SLV',10,'Tempat duduk di sayap kiri');
INSERT INTO `pricing` (`id`, `created_date`, `modified_date`, `name`, `price`,`codename`, `stock`,`description`) VALUES (4,NULL,NULL,'Crystal',300000,'CTL',10,'Jongkok Dipinggiran');
INSERT INTO `pricing` (`id`, `created_date`, `modified_date`, `name`, `price`,`codename`, `stock`,`description`) VALUES (5,NULL,NULL,'Ruby',300000,'RBY',10,'Kursi Di Lantai 10');

INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (1,1);
INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (1,2);
INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (1,3);
INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (2,4);
INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (2,5);

-- INSERT INTO `transaction` (`id`, `created_date`, `modified_date`, `grand`, `quantity`, `pricing_id`, `user_id`,`trans_type`) VALUES ('B_0001',NULL,NULL,150000,2,1,1,1);
-- INSERT INTO `transaction` (`id`, `created_date`, `modified_date`, `grand`, `quantity`, `pricing_id`, `user_id`,`trans_type`) VALUES ('B_0002',NULL,NULL,200000,1,2,1,0);
-- INSERT INTO `transaction` (`id`, `created_date`, `modified_date`, `grand`, `quantity`, `pricing_id`, `user_id`,`trans_type`) VALUES ('B_0003',NULL,NULL,250000,1,2,1,1);
-- INSERT INTO `transaction` (`id`, `created_date`, `modified_date`, `grand`, `quantity`, `pricing_id`, `user_id`,`trans_type`) VALUES ('B_0004',NULL,NULL,250000,1,2,1,0);



INSERT INTO `merchant` (`id`, `created_date`, `modified_date`, `address`, `city`, `description`, `id_card_number`, `id_card_type`, `name`, `phone`, `status`) VALUES (1,NULL,NULL,'Jl. Situ Ngalor Ngidul','Jakarta Selatan','Toko Penyedia baju sablonan',1123456789,0,'Joko Supratmino','084687452135',0);
INSERT INTO `merchant` (`id`, `created_date`, `modified_date`, `address`, `city`, `description`, `id_card_number`, `id_card_type`, `name`, `phone`, `status`) VALUES (2,NULL,NULL,'Jl. Situ Bagendit','Jakarta Timur','Toko Penyedia Makanan Ringan',1123456789,0,'Prabambang Subambang','0846873242135',0);

-- INSERT INTO `ticket` (`id`, `created_date`, `modified_date`, `code_prefix`,`code_seq`, `transaction_id`,`status`) VALUES (1,NULL,NULL,'TRB',1,1,0);
-- INSERT INTO `ticket` (`id`, `created_date`, `modified_date`, `code_prefix`,`code_seq`,`transaction_id`,`status`) VALUES (2,NULL,NULL,'TRB',2,1,0);
-- INSERT INTO `ticket` (`id`, `created_date`, `modified_date`, `code_prefix`,`code_seq`, `transaction_id`,`status`) VALUES (3,NULL,NULL,'BRZ',1,2,0);

INSERT INTO `user_audience` (`user_id`, `audience_id`) VALUES (1,1);


INSERT INTO `user_admin` (`user_id`, `admin_id`) VALUES (2,1);

INSERT INTO `user_credit` (`user_id`, `credit_id`) VALUES (1,1);
INSERT INTO `user_credit` (`user_id`, `credit_id`) VALUES (4,2);

INSERT INTO `user_eo` (`user_id`, `eo_id`) VALUES (4,1);

INSERT INTO `user_merchant` (`user_id`, `merchant_id`) VALUES (3,1);
INSERT INTO `user_merchant` (`user_id`, `audience_id`) VALUES (5,2);

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (2,1);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (1,2);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (3,3);
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (4,4);

INSERT INTO `event_category` (`event_id`, `category_id`) VALUES (1,1);
INSERT INTO `event_category` (`event_id`, `category_id`) VALUES (2,2);
INSERT INTO `event_category` (`event_id`, `category_id`) VALUES (3,3);

INSERT INTO `event_eo`(`eo_id`,`event_id`) VALUES (1,1);
INSERT INTO `event_eo`(`eo_id`,`event_id`) VALUES (1,2);


INSERT INTO `event_location` (`event_id`,`location_id`) VALUES(1,1);
INSERT INTO `event_location` (`event_id`,`location_id`) VALUES(2,2);

INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (1,1);
INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (1,2);
INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (1,3);
INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (2,4);
INSERT INTO `event_pricing` (`event_id`, `pricing_id`) VALUES (2,5);

