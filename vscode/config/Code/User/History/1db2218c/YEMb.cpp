/*
 *   SISM - Services manager for GNU/Linux based operating systems
 *   Copyright (C) 2023 Luiz Gustavo <luizgfc@proton.me>
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as
 *   published by the Free Software Foundation, either version 3 of the
 *   License, or (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Affero General Public License for more details.
 *
 *   You should have received a copy of the GNU Affero General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


#include "unit-file.h"
#include <filesystem>

using namespace provider::systemd;

UnitFile UnitFile::from_list_unit_file_response_item(dbus::systemd::list_unit_files_response_unit_file_t unit_file) {    
    std::string complete_file_path = unit_file.get<0>();
    std::filesystem::path parsed_file_path(complete_file_path);

    
}


std::vector<UnitFile> UnitFile::from_list_unit_file_response(dbus::systemd::list_unit_files_response_t response) {

}


std::vector<UnitFile> UnitFile::sort(std::vector<UnitFile> unit_files) {

}
