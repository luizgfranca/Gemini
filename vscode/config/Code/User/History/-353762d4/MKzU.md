# Dockerfile examples for containerized systemd (mainly for test environments)

* `Dockerfile.archlinux`: Arch Linux (systemd 247, as of Feb 2021)
* `Dockerfile.centos-8.3`: CentOS 8.3 (systemd 239)
* `Dockerfile.debian-10`: Debian GNU/Linux 10 (systemd 241)
* `Dockerfile.fedora-33`: Fedora 33 (systemd 246)
* `Dockerfile.opensuse-tumbleweed`: openSUSE Tumbleweed (systemd 246, as of Feb 2021)
* `Dockerfile.ubuntu-20.04`: Ubuntu 20.04 (systemd 245)

### Added on this fork:
* `Dockerfile.fedora-38`: Fedora 33 (systemd 253)
* `Dockerfile.ubuntu-20.04`: Ubuntu 23.04 (systemd 252)

## Example

* The command (`/bin/bash`) specified as the argument of `docker run` is executed as the foreground job in the container.
* Workdir (`--workdir /usr`) is propagated
* Env vars (`-e FOO=hello`) are propagated
* The container shuts down when the command exits. The exit status code (`42`) is propagated.

```console
$ docker build -t foo -f Dockerfile.debian-10 .
$ docker run -it --rm --privileged --workdir /usr -e FOO=hello foo /bin/bash
```