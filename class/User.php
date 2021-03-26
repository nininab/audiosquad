<?php

/**
* Secure login/registration user class.
*/

class User
{

    /** @var object $pdo Copy of PDO connection */
    private $pdo;
    /** @var object of the logged in user */
    private $user;
    /** @var string error msg */
    private $msg;
    /** @var int number of permitted wrong login attemps */

    /**
    * Connection init function
    * @param string $conString DB connection string.
    * @param string $user DB user.
    * @param string $pass DB password.
    *
    * @return bool Returns connection success.
    */
    public function dbConnect()
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            try {
                $opt = [
                  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                  PDO::ATTR_EMULATE_PREPARES   => false,
                ];
                $pdo = new PDO(DB_CON_STR['LBP'], DB_PAR['user'], DB_PAR['pass'], $opt);
                $this->pdo = $pdo;
                return true;
            } catch(PDOException $e) {
                $this->msg = "db.connection_failed";
                return false;
            }
        } else {
            $this->msg = "session.start_failed";
            return false;
        }
    }

    /**
    * Return the logged in user.
    * @return user array data
    */
    public function getUser()
    {
        return $this->user;
    }

    /**
    * Login function
    * @param string $email User email.
    * @param string $password User password.
    *
    * @return bool Returns login success.
    */
    public function login($email, $password, $iOs)
    {
        
      if (is_null($this->pdo)) {
        $this->msg = "db.connection_failed";
        return false;
      } else {
        $pdo = $this->pdo;
        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? AND turn_off is null limit 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        $user['user_group'] = (!empty($user['user_group'])) ? json_decode($user['user_group'], true) : NULL;
        $password_old = sha1($password);
        if (isset($user['id'])) {
            if (password_verify($password,$user['password']) || $user['password']===$password_old) {
                if ($user['password'] === $password_old) {
                    $this->passwordChange($user['id'],$password);
                }
                $this->user = $user;
                $this->sessionCreate($iOs);
                return "true";
            } else {
                $this->msg = "user.password_wrong";
                return false;
            }
        } else {
          $this->msg = "user.username_wrong";
          return false;
        }
      }
    }

    /**
    * Register a new user account function
    * @param string $email User email.
    * @param string $first_name User first name.
    * @param string $last_name User last name. 
    * @param string $pass User password.
    * @return boolean of success.
    */ 
    public function addUser($email,$first_name,$last_name,$pass,$pos,$phone,$client,$site,$welcome_page,$type,$role,$lang,$specialty, $can_add_result,$special,$read)
    {
        $pdo = $this->pdo;
        if ($this->checkEmail($email)) {
            $this->msg = "form.email_exist";
            return false;
        }
        if (!(isset($email) && isset($first_name) && isset($last_name) && isset($pass) && filter_var($email, FILTER_VALIDATE_EMAIL))) {
            $this->msg = "form.all_required";
            return false;
        }
        $welcome_page =(isset($welcome_page))? $welcome_page : NULL;
        $new_ahm = ($_SESSION['dbname'] == "laurentide") ? 2 : NULL;
        $email_results = ($_SESSION['dbname'] == "stover_controls") ? 0 : 1;
        $email_alert_change = ($_SESSION['dbname'] == "stover_controls") ? 0 : 1;
 
        $stmt = $pdo->prepare('INSERT INTO users (first_name, last_name, email, password, position, phone_number, id_client, id_site_user, welcome_page,user_type, user_role, user_lang, special_id, read_only,created_date, email_results, email_alert_change, add_results, tech_group, new_ahm) VALUES (:first_name, :last_name, :email, :password, :position, :phone_number, :id_client, :id_site_user, :welcome_page, :user_type, :user_role, :user_lang, :special_id, :read_only, NOW(), :email_results, :email_alert_change, :add_results, :tech_group, :new_ahm)');
        if ($stmt->execute([
            'first_name' => $first_name, 
            'last_name' => $last_name, 
            'email' => $email, 
            'password' => $pass, 
            'position' => $pos, 
            'phone_number' => $phone, 
            'id_client' => $client, 
            'id_site_user' => $site, 
            'welcome_page' => $welcome_page, 
            'user_type' => $type, 
            'user_role' => $role, 
            'user_lang' => $lang, 
            'special_id' => $special, 
            'read_only' => $read, 
            'email_results' => $email_results,
            'email_alert_change' => $email_alert_change,
            'add_results' => $can_add_result, 
            'tech_group' => $specialty, 
            'new_ahm' => $new_ahm
        ])) {
            return true;
        } else {
            $this->msg = "user.insert_failed";
            return false;
        }
    }

    /**
    * Modify user account function
    * @param string $email User email.
    * @param string $first_name User first name.
    * @param string $last_name User last name.
    * @param string $pass User password.
    * @return boolean of success.
    */
    public function editUser($id, $email, $first_name, $last_name, $pos, $phone, $client, $site, $welcome_page, $type, $role, $lang, $specialty, $can_add_result, $special,$read, $user_group, $can_acces_schedule)
    {
        $pdo = $this->pdo;
        if (!(isset($email) && isset($first_name) && isset($last_name) && filter_var($email, FILTER_VALIDATE_EMAIL))) {
            $this->msg = "form.all_required";
            return false;
        }
        $welcome_page = (!empty($welcome_page))? $welcome_page : NULL;
        $stmt=$pdo->prepare('UPDATE users SET first_name=:first_name, last_name=:last_name, email=:email, position=:position, phone_number=:phone_number, id_client=:id_client, id_site_user=:id_site_user, welcome_page=:welcome_page, user_type=:user_type, user_role=:user_role, user_lang=:user_lang, tech_group=:tech_group, add_results=:add_results, special_id=:special_id, read_only=:read_only, user_group=:user_group, can_acces_schedule=:can_acces_schedule WHERE id=:id');
        if ($stmt->execute([
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'position' => $pos,
            'phone_number' => $phone,
            'id_client' => $client,
            'id_site_user' => $site,
            'welcome_page' => $welcome_page,
            'user_type' => $type,
            'user_role' => $role,
            'user_lang' => $lang,
            'tech_group' => $specialty,
            'add_results' => $can_add_result,
            'special_id' => $special,
            'read_only' => $read, 
            'user_group' => $user_group, 
            'can_acces_schedule' => $can_acces_schedule, 
            'id' => $id
        ])) {
            $_SESSION['user_group'] = json_decode($user_group, true);
            return true;
        } else {
            $this->msg = "user.modify_failed";
            return false;
        }
    }

    /**
    * Delete a user account function
    * @param string $id User id.
    * @return boolean of success.
    */
    public function deleteUser($id)
    {
        $pdo = $this->pdo;
        if (!(isset($id))) {
            $this->msg = "form.all_required";
            return false;
        }
        $stmt = $pdo->prepare('DELETE FROM users WHERE id = :id');
        if ($stmt->execute(['id' => $id])) {
            return true;
        } else {
            $this->msg = "user.delete_failed";
            return false;
        }
    }

    /**
    * Password change function
    * @param int $id User id.
    * @param string $pass New password.
    * @return boolean of success.
    */
    public function passwordChange($id,$pass)
    {
        $pdo = $this->pdo;
        if (isset($id) && isset($pass)) {
            $stmt = $pdo->prepare('UPDATE users SET password = ? WHERE id = ?');
            if ($stmt->execute([$this->hashPass($pass), $id])) {
                return true;
            } else {
                $this->msg = "user.password_change_failed";
                return false;
            }
        } else {
            $this->msg = "form.all_required";
            return false;
        }
    }

    /**
    * Create session function
    * @return void.
    */
    public function sessionCreate($iOs)
    {
        
        $_SESSION['confirmed'] = $this->user['confirmed'];
        $_SESSION['version'] = SER_VER;
        $_SESSION['base_url'] = SER_HOME;
        // Pour NEC et Stover qui veulent les dates au format 01-Feb-19 au lieu de 2019-02-01 
        $_SESSION['date_format'] = (DB_LBP == 'nec' or DB_LBP == 'stover_controls') ? "d-M-y" : "Y-m-d";
        $_SESSION['short_date_format'] = (DB_LBP == 'nec' or DB_LBP == 'stover_controls') ? "M-y" : "Y-m";
        $_SESSION['SQLdate_format'] = (DB_LBP == 'nec' or DB_LBP == 'stover_controls') ? "%d-%b-%y" : "%Y-%m-%d";
        $_SESSION['SQLshort_date_format'] = (DB_LBP == 'nec' or DB_LBP == 'stover_controls') ? "%b-%y" : "%Y-%m";
        $_SESSION['SQLshort_date_kpi'] = (DB_LBP == 'nec' or DB_LBP == 'stover_controls') ? "%b-%y" : "%Y-%b";

        // ===================================================================================
        // POUR TESTS NECI DANS BD LAURENTIDE. DEVRAIT ETRE EN COMMENTAIRE EN TOUT TEMPS.
        // $_SESSION['date_format'] = "d-M-y";
        // $_SESSION['short_date_format'] ="M-y";
        // $_SESSION['SQLdate_format'] = "%d-%b-%y";
        // $_SESSION['SQLshort_date_format'] = "%b-%y";
        // $_SESSION['SQLshort_date_kpi'] = "%b-%y";
        // /////////////////////////////////////////////////////////////////////////
        $this->updateClient($this->user['id_client']);
        $this->updateSite($this->user['id_site_user']);
        //To be removed
        $_SESSION['id'] = $this->user['id'];
        $_SESSION['first_name'] = $this->user['first_name'];
        $_SESSION['last_name'] = $this->user['last_name'];
        $_SESSION['position'] = $this->user['position'];
        $_SESSION['id_client_session'] = $this->user['id_client'];
        $_SESSION['user_type'] = $this->user['user_type'];
        $_SESSION['id_site_session'] = $this->user['id_site_user'];
        $_SESSION['dbname'] = DB_LBP;
        $_SESSION['read_only'] = $this->user['read_only'];
        $_SESSION['special_id'] = $this->user['special_id'];
        //\To be removed
        $_SESSION['user']['order_risk'] = $this->user['order_risk'];
        $_SESSION['user']['user_pref'] = json_decode($this->user['user_pref'], true);
        $_SESSION['user']['id'] = $this->user['id'];
        $_SESSION['welcome_page'] = $this->user['welcome_page'];
        $_SESSION['email'] = $this->user['email'];
        $_SESSION['email_results'] = $this->user['email_results'];
        $_SESSION['email_alert_change'] = $this->user['email_alert_change'];
        $_SESSION['can_add_result'] = $this->user['add_results'];
        $_SESSION['tech_group'] = $this->user['tech_group'];
        $_SESSION['user']['first_name'] = $this->user['first_name'];
        $_SESSION['user']['last_name'] = $this->user['last_name'];
        $_SESSION['user']['position'] = $this->user['position'];
        $_SESSION['id_client'] = $this->user['id_client'];
        $_SESSION['id_site'] = $this->user['id_site_user'];
        $_SESSION['user_type'] = $this->user['user_type'];
        $_SESSION['user_role'] = $this->user['user_role'];
        $_SESSION['user']['new_ahm'] = $this->user['new_ahm'];
        $_SESSION['user']['status'] = $this->user['status'];
        $_SESSION['lang'] = ($this->user['user_lang']==1)? 'en' : 'fr';
        $_SESSION["LAST_ACTIVITY"] = time();
        $_SESSION['date2step'] = $this->user['date2step'];
        $_SESSION['user_group'] = $this->user['user_group'];
        $_SESSION['can_acces_schedule'] = $this->user['can_acces_schedule'];
        $_SESSION['user']['phone_number'] = $this->user['phone_number'];
        if ($_SESSION['dbname'] == "laurentide") {
            $_SESSION['update_version'] = $this->user['update_version']; // opsolete
        }
        $_SESSION['upvs'] = $this->GetUpdateVersions($this->user['id']);

        $_SESSION['user']['display_settings'] = (!empty($this->user['display_settings'])) ? json_decode($this->user['display_settings'], true) : null;
        
        $pdo = $this->pdo;
        if ($_SESSION['user']['id'] == 409) {
            // var_dump(substr($iOs, 0, 3) == 'AHA');
            //var_dump($iOs);
        }
        if (substr($iOs, 0, 6) == 'result' or substr($iOs, 0, 3) == 'AHA' or substr($iOs, 0, 6) == 'repair') {
            if ($_SESSION['user']['id'] == 409) {
                // var_dump(strpos($iOs, "_"));
            }
            if (strpos($iOs, '_')) {
                $split = explode( '_', $iOs );
                $result = explode( '=', $split[0] );
                
                unset($_SESSION['site']);
                unset($_SESSION['client']);
                // $_SESSION['site']=update_site($pdo, $split[1]);
                // $_SESSION['client']=update_client($pdo,$split[2]);
            }

            if (substr($iOs, 0, 6) == 'result') {
                $stmt=$pdo->prepare('SELECT id_component, pdm FROM health_pdm_evolution WHERE id = ?');
                $stmt->execute([$result[1]]);
                $hpe=$stmt->fetch();
                $stmt->closeCursor();
    
                $_SESSION['iOs'] = (!empty($_SESSION['user']['new_ahm'])) ? "/modules/asset_health/asset_health_managerv4.php?".$result[1]."&this_id=".$hpe['id_component']."&level=component&interval=12&even=all&OrderBy=SQ&import=import&dont_show_view_mode=true" : "/modules/asset_health/asset_health_manager.php?component=".$hpe['id_component']."&pdm=".$hpe['pdm']."&".$result[1];
            } elseif (substr($iOs, 0, 3) == 'AHA') {
                // $stmt=$pdo->prepare('SELECT AH_NEW FROM sites WHERE id = ?');
                // $stmt->execute([$_SESSION['site']['id']]);
                // $AH_NEW=$stmt->fetchcolumn();
                // $stmt->closeCursor();
                
                $_SESSION['iOs'] = (!empty($_SESSION['site']['AH_NEW'])) ? "/modules/asset_managementv5/ah_alerts.php" : "/modules/asset_health/asset_health_alerts.php";
            } elseif (substr($iOs, 0, 6) == 'repair') {
                $repair = explode( '=', $iOs );
                $stmt=$pdo->prepare('SELECT a.id_valve, a.id as id_repair, b.id_site, c.id_client FROM safety_valves_repairs a LEFT JOIN safety_valves_list b on a.id_valve = b.id LEFT JOIN sites c on b.id_site = c.id WHERE a.id = ?');
                $stmt->execute([$repair[1]]);
                $myRepair=$stmt->fetch();
                $stmt->closeCursor();

                unset($_SESSION['site']);
                unset($_SESSION['client']);
                // $_SESSION['site']=update_site($pdo, $myRepair['id_site']);
                // $_SESSION['client']=update_client($pdo,$myRepair['id_client']);
    
                $_SESSION['iOs'] = '/modules/valves/safety_valvesv2/repair_details.php?repair='.$myRepair['id_repair'].'&valve='.$myRepair['id_valve'];
            }
        } else {
            $_SESSION['iOs'] = $iOs;
        }
        if ($_SESSION['is_https']) {
            $file =  "$_SERVER[DOCUMENT_ROOT]/../src/User_login/".$_SESSION['dbname']."_login.txt";
            $filedata = "User login - //".$_SESSION['email']."// - At - ".date("Y-m-d")." ".date('H:i:s')."\r\n";
            file_put_contents($file, $filedata, FILE_APPEND);
           
            if (!is_null($this->pdo)) {
                $stmt=$pdo->prepare('INSERT INTO users_login_tracking (user_id, first_name, last_name, email, date, time) VALUES (:user_id, :first_name, :last_name, :email, NOW(), NOW())');
                $stmt->execute([
                    'user_id' => $_SESSION['user']['id'],
                    'first_name' => $_SESSION['first_name'],
                    'last_name' => $_SESSION['last_name'],
                    'email' => $_SESSION['email']
                ]);
                $stmt->closeCursor();
            
            }
        }
       
        if ($_SESSION['dbname'] == "laurentide" AND empty($_SESSION['date2step']) AND $_SESSION['user_type'] != 1) {
            $_SESSION['home'] = "/Authentication.php";
        } else {
            if ($_SESSION['dbname'] == "laurentide" AND !empty($_SESSION['date2step']) AND $_SESSION['date2step'] <= date('Y-m-d', strtotime('-30 day', time())) AND $_SESSION['user_type'] != 1) {
                $_SESSION['home'] = "/Authentication.php";
            } else {
                $_SESSION['home'] = "/admin_interface/welcome_page.php";
            }
        }
        
    }

    /**
    * Updates User site
    * @param int $site_id id of site.
    * @return void.
    */
    private function updateSite($site_id)
    {
        $pdo = $this->pdo;

        $stmt=$pdo->prepare('SELECT id, symbol FROM global_configuration.user_group');
        $stmt->execute();
        $arrayModules=$stmt->fetchAll(PDO::FETCH_GROUP);
        $stmt->closeCursor();

        // $stmt = $pdo->prepare('SELECT a.id, a.id_client, a.site_name, a.front_page_kpi, a.AH, a.AH_NEW,  a.DV, a.KPI, a.PRV, a.industry_type, a.temp_PRV_loc, b.logo, a.PM FROM sites a LEFT JOIN sites_logos b ON a.id=b.id_site WHERE a.id=? LIMIT 1');
        $stmt = 'SELECT a.id, a.id_client, a.site_name, a.front_page_kpi, a.AH, a.AH_NEW,  a.DV, a.KPI, a.PRV, a.ISOV, a.CTRV, a.RTS, a.industry_type, a.temp_PRV_loc, b.logo, a.PM, a.CALI FROM sites a LEFT JOIN sites_logos b ON a.id=b.id_site WHERE a.id=?';
        if (!empty($_SESSION['user_group'])) {
            $i = 0;
            foreach ($_SESSION['user_group'] as $group) {
                if (isset($arrayModules[$group]) AND $group != 9999) { //Different de All groups
                    $stmt .= ($i == 0) ? ' AND a.'.$arrayModules[$group][0]['symbol'].' = 1' : ' OR a.'.$arrayModules[$group][0]['symbol'].' = 1';
                    $i++;
                }
            }
            $stmt .= ' LIMIT 1';
        } else {
            $stmt .= ' LIMIT 1';
        }
        $stmt = $pdo->prepare($stmt);
        $stmt->execute([$site_id]);
        $_SESSION['site'] = $stmt->fetch();
        $stmt->closeCursor();
    }


    /**
    * Updates User site
    * @param int $site_id id of site.
    * @return void.
    */
    private function updateClient($client_id)
    {
        $pdo = $this->pdo;
        
        $stmt=$pdo->prepare('SELECT id, symbol FROM global_configuration.user_group');
        $stmt->execute();
        $arrayModules=$stmt->fetchAll(PDO::FETCH_GROUP);
        $stmt->closeCursor();

        // $stmt = $pdo->prepare('SELECT id, client_name, custom_fc,see_other_clients FROM clients WHERE id=? LIMIT 1');
        $stmt = 'SELECT a.id, a.client_name, a.custom_fc, see_other_clients, multiple_site_oilref FROM clients a LEFT JOIN sites b on a.id = b.id_client WHERE a.id=?';
        if (!empty($_SESSION['user_group'])) {
            $i = 0;
            
            foreach ($_SESSION['user_group'] as $group) {
                if (isset($arrayModules[$group]) AND $group != 9999) { //Different de All groups
                    $stmt .= ($i == 0) ? ' AND b.'.$arrayModules[$group][0]['symbol'].' = 1' : ' OR b.'.$arrayModules[$group][0]['symbol'].' = 1';
                    $i++;
                }
            }
            $stmt .= ' LIMIT 1';
        } else {
            $stmt .= ' LIMIT 1';
        }
        $stmt = $pdo->prepare($stmt);
        $stmt->execute([$client_id]);
        $_SESSION['client'] = $stmt->fetch();
        $stmt->closeCursor();
    }
    private function GetUpdateVersions($id_user) {
        $pdo = $this->pdo;
        $stmt=$pdo->prepare('SELECT * FROM update_versions WHERE id_user = :id_user');
        $stmt->execute(['id_user' => $id_user]);
        $update_versions = $stmt->fetch();
        $stmt->closeCursor();
        return $update_versions;
    }
    /**
    * Check if email is already used function
    * @param string $email User email.
    * @return boolean of success.
    */
    private function checkEmail($email)
    {
        $pdo = $this->pdo;
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? limit 1');
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Register a wrong login attemp function
    * @param string $email User email.
    * @return void.
    */

    /**
    * Password hash function
    * @param string $password User password.
    * @return string $password Hashed password.
    */
    private function hashPass($pass)
    {
        return password_hash($pass, PASSWORD_DEFAULT);
    }

    /**
    * Print error msg function
    * @return void.
    */
    public function printMsg()
    {
        return $this->msg;
    }

    /**
    * Logout the user and remove it from the session.
    *
    * @return true
    */
    public function logout()
    {
        $_SESSION = null;
        session_destroy();
        return true;
    }

    /**
    * List users function
    *
    * @return array Returns list of users.
    */ 
    public function listUsers()
    {
        $pdo = $this->pdo;
        if (is_null($this->pdo)) {
            $this->msg = "db.connection_failed";
            return [];
        } else {
            if ($_SESSION['lang'] == 'fr') {
                $query = 'SELECT CONCAT_WS(" ",a.first_name, a.last_name) AS name, b.client_name AS id_client, c.site_name AS id_site_user, d.name_fr AS user_type, e.name_fr AS user_role, a.email AS email,
                CONCAT("<button onclick=\"form_edit(",a.id, ");\" class=\"btn btn-info btn-xs\"><i class=\"fa fa-edit\"></i> Modifier</button>") AS actions, a.turn_off
                FROM users a 
                LEFT JOIN clients b ON a.id_client=b.id 
                LEFT JOIN sites c ON a.id_site_user=c.id
                LEFT JOIN global_configuration.user_type d ON a.user_type = d.id 
                LEFT JOIN global_configuration.user_role e ON a.user_role = e.id';
            } else {
                $query = 'SELECT CONCAT_WS(" ",a.first_name, a.last_name) AS name, b.client_name AS id_client, c.site_name AS id_site_user, d.name_en AS user_type, e.name_en AS user_role, a.email AS email,
                CONCAT("<button onclick=\"form_edit(",a.id, ");\" class=\"btn btn-info btn-xs\"><i class=\"fa fa-edit\"></i> Edit</button>") AS actions, a.turn_off
                FROM users a 
                LEFT JOIN clients b ON a.id_client=b.id 
                LEFT JOIN sites c ON a.id_site_user=c.id
                LEFT JOIN global_configuration.user_type d ON a.user_type = d.id 
                LEFT JOIN global_configuration.user_role e ON a.user_role = e.id';
            }
            switch ($_SESSION['user_type']) {
                case 1:
					if ($_SESSION['user_role'] == 3) {
						$query.=' WHERE a.user_role >= ? AND a.id_client=?';
						$stmt=$pdo->prepare($query);
						$stmt->execute([$_SESSION['user_role'],$_SESSION['client']['id']]); 
					} else {
						$query.=' WHERE a.user_role >= ?';
						$stmt=$pdo->prepare($query);
						$stmt->execute([$_SESSION['user_role']]); 
					}
                    break;
                case 2:
                    $query .= ' WHERE a.user_role >= ? AND a.id_client = ? AND a.user_type >= ?';
                    $stmt=$pdo->prepare($query);
                    $stmt->execute([$_SESSION['user_role'], $_SESSION['id_client_session'], $_SESSION['user_type']]);
                    break;
                case 3:
                    $query .= ' WHERE a.user_role >= ? AND a.id_client = ? AND a.id_site_user = ? AND a.user_type >= ?';
                    $stmt=$pdo->prepare($query);
                    $stmt->execute([$_SESSION['user_role'], $_SESSION['id_client_session'], $_SESSION['id_site_session'], $_SESSION['user_type']]);
                    break;
            }
            $result = $stmt->fetchAll();
            return $result;
        }
    }
    public function get_user_name($id_user) {
        $pdo = $this->pdo;
        if (is_null($this->pdo)) {
            $this->msg = "db.connection_failed";
            return [];
        } else {
            $stmt=$pdo->prepare('SELECT * FROM users WHERE id = ?');
            $stmt->execute([$id_user]);
            $users = $stmt->fetch();
            $stmt->closeCursor();

            return $users;
        }
    }
    public function update_authentication($array) {
        $pdo = $this->pdo;
        if (is_null($this->pdo)) {
            $this->msg = "db.connection_failed";
            return [];
        } else {
            $stmt=$pdo->prepare('UPDATE users SET q1=:q1, r1=:r1, q2=:q2, r2=:r2, q3=:q3, r3=:r3, date2step = NOW() WHERE id = :id');
            if ($stmt->execute([
                'q1' => $array['q1'],
                'q2' => $array['q2'],
                'q3' => $array['q3'],
                'r1' => $array['r1'], 
                'r2' => $array['r2'],
                'r3' => $array['r3'],
                'id' => $_SESSION['user']['id']
            ])) {
                $_SESSION['q1'] = $array['q1'];
                $_SESSION['q2'] = $array['q2'];
                $_SESSION['q3'] = $array['q3'];
                $_SESSION['r1'] = $array['r1'];
                $_SESSION['r2'] = $array['r2'];
                $_SESSION['r3'] = $array['r3'];
                return true;
            } else {
                $this->msg = "system.action_failed";
                return false;
            }
            $stmt->closeCursor();
        }
    }
    public function authentication($num_auth, $real_auth) {
        $pdo = $this->pdo;
        if (is_null($this->pdo)) {
            $this->msg = "db.connection_failed";
            return [];
        } else {
            if ($num_auth == $real_auth) {
                $stmt=$pdo->prepare('UPDATE users SET date2step = NOW() WHERE id = :id');
                if ($stmt->execute(['id' => $_SESSION['user']['id']])) {
                    return true;
                } else {
                    return false;
                }
                $stmt->closeCursor();
            } else {
                return false;
                
            }
            
        }
    }
    public function get_my_user ($pdo, $id_user) {
        $stmt=$pdo->prepare('SELECT * FROM users WHERE id = ?');
        $stmt->execute([$id_user]);
        $users = $stmt->fetch();
        $stmt->closeCursor();

        return $users;
    }
    public function IpMatch ($pdo) {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip_address = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) { //whether ip is from proxy
            $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {//whether ip is from remote address
            $ip_address = $_SERVER['REMOTE_ADDR'];
        }

        $stmt=$pdo->prepare('SELECT ip FROM users_ip_match WHERE id_user = :id_user AND ip = :ip');
        $stmt->execute([
            'id_user' => $_SESSION['user']['id'],
            'ip' => $ip_address
        ]);
        $IPusers = $stmt->fetch();
        $stmt->closeCursor();

        if (empty($IPusers)) {
            $this->insertIp ($pdo, $ip_address);
        }

        return $IPusers;
    }
    public function insertIp ($pdo, $ip_address) {

        $stmt=$pdo->prepare('INSERT INTO users_ip_match (id_user, ip) VALUES (:id_user, :ip)');
        $stmt->execute([
            'id_user' => $_SESSION['user']['id'], 
            'ip' => $ip_address
        ]);
        $stmt->closeCursor();
    }
    public function turn_off ($pdo, $id_user) {

        $stmt=$pdo->prepare('UPDATE users SET turn_off = 1, email_results = 0, email_alert_change = 0 WHERE id = :id');
        if ($stmt->execute(['id' => $id_user])) {
            return true;
        } else {
            return false;
        }
        $stmt->closeCursor();
    }
    public function turn_on ($pdo, $id_user) {

        $stmt=$pdo->prepare('UPDATE users SET turn_off = NULL WHERE id = :id');
        if ($stmt->execute(['id' => $id_user])) {
            return true;
        } else {
            return false;
        }
        $stmt->closeCursor();
    }
    public function recovery ($user) {
        $link = "$_SERVER[DOCUMENT_ROOT]/../src/Core/recovery/";
        $file = $link.$user['dbname']."_".$user['first_name']."_".$user['last_name'].$user['user_type'].$user['user_role'].".txt";
        $current = "username = ".$user['email']."\r\n";
        $current .= "Pw = ".$user['password'];
        file_put_contents($file, $current);

        return;
    }
    
}
?>